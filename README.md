# RotinaAPP-Framework

Aplicação web full-stack para gerenciamento de tarefas e rotinas diárias. Criação, categorização, busca avançada, rascunhos e gestão de categorias com interface fluida, responsiva e acessível.

> **Versão atual:** 1.0.0-beta | **Última atualização:** 5 de Junho de 2026

---

## 🗺️ Roadmap de Desenvolvimento

| Funcionalidade | Progresso | Observações |
|----------------|:---------:|-------------|
| Landing Page | ✅ 100% | Home pública com seções hero, features e CTA |
| Autenticação (Login / Criar Conta) | ✅ 100% | Fluxo completo com cookie de sessão e refresh token |
| CRUD de Tarefas | ✅ 100% | Criar, listar, editar, concluir e excluir tarefas |
| Gestão de Categorias | ✅ 100% | Criar, listar, renomear e excluir; ações em lote (concluir/incompletar todas) |
| Sistema de Rascunhos (Tarefas + Categorias) | ✅ 100% | Criação rápida via FAB com Floating UI; conversão para itens definitivos |
| Busca com URL Params | ✅ 100% | Parâmetros tipados e compartilháveis via `nuqs` |
| Página de Filtros | ✅ 90% | Filtros por status, categoria, data e ordenação; faltam dados reais de categorias |
| Lixeira (Restaurar / Excluir permanente) | ✅ 100% | Listagem, restauração individual e exclusão definitiva |
| Navegação Desktop (Sidebar) | ✅ 100% | Sidebar colapsável com ícones e texto opcional |
| Navegação Mobile (Bottom Bar) | ✅ 100% | Barra inferior fixa com menu hambúrguer fullscreen animado |
| Página de Perfil | 🚧 60% | Layout implementado; ações de salvar/sair/redefinir ainda não conectadas ao backend |
| Temas (Claro / Escuro / Auto) | 🚧 30% | Seletor de tema com rádio buttons; lógica de aplicação pendente |
| Chat com IA | 🚧 20% | Interface do chat pronta; integração com IA pendente |
| Permissões de Acesso | 📋 0% | Placeholder implementado; regras de autorização a definir |
| Testes automatizados | 📋 0% | A definir framework e cobertura |

---

## 🔄 Refatorações Recentes

### Rodada 3 — Responsividade _(Jun 2026)_

| Arquivo | Problema | Correção |
|---------|----------|----------|
| `DetalhesRotina.tsx`, `detalhes-categoria.tsx` | Modal com `md:min-w-[1000px]` quebrava em tablets < 1000px | `md:min-w-0 md:w-full md:max-w-3xl` |
| `renomear.tsx` (3 modais) | Modal com `md:min-w-[750px]` sem espaço em tablets 768px | `md:w-[90%] md:max-w-2xl` |
| `renomear.tsx` (3 modais) | `min-w-[350px]` estourava em telas 320px | `min-w-0 w-[90%] max-w-lg` |
| `searchFloatBar.tsx`, `BtnSearchPopup.tsx` | `bottom-15` (60px) sobrepondo nav mobile de 80px | `bottom-20` (80px) — fica acima da nav |
| `HeaderMobile.tsx` | `text-[10px]` ilegível nos labels | `text-xs` (12px) — mínimo legível |
| `LayoutHome/layout.tsx` | `<main>` sem largura máxima em telas grandes | `max-w-7xl mx-auto` — conteúdo contido |
| `Filtro/component.tsx` | `max-w-[180px]` e `max-w-min!` truncavam labels | `max-w-[200px]` — espaço adequado |
| `Config.tsx` | Breakpoints obscuros: `xs:max-2xs:w-40 3xs:max-4xs:w-50` | `w-40 sm:w-48 md:w-full` |
| `SearchTasks/component.tsx`, `rascunhos.tsx` | `bottom-24` inconsistente com `pb-28` do layout | `bottom-28` — alinhado |
| `SearchTasks/SearchTasks.tsx` | `min-h-[calc(100vh-160px)]` hardcoded | `min-h-[calc(100vh-8rem)]` — valores relativos |
| `paragrafo.tsx` | `text-base` fixo em mobile | `text-sm sm:text-base` — melhor leitura |
| `Filtro/component.tsx` | `text-[10px]` em textos auxiliares | `text-xs` (12px) |

### Rodada 2 — Estilização & Design System _(Jun 2026)_

| Arquivo | Problema | Correção |
|---------|----------|----------|
| `btn.tsx` | `bg-blue-400 text-white` — contraste **2.88:1** (falha WCAG AA) | `bg-blue-500` + `hover:bg-blue-600` + `active:bg-blue-700` (4.6:1) |
| Projeto todo (60 ocorrências) | `text-blue-300` — contraste **1.94:1** sobre branco | `text-blue-500` (4.6:1 — atende WCAG AA) |
| `Tasks.tsx`, `infoCategorias.tsx`, `rascunhos.tsx` | `border-slate-100` misturado com `border-blue-50` | Unificado para `border-blue-50` |
| 7 arquivos | `bg-gray-400` em botões cancelar sem padronização | `bg-gray-500` — consistente |
| `Filtro/component.tsx` | `bg-blue-600` fora do design system (azul mais escuro) | `bg-blue-500` (ativo) / `bg-blue-400!` (inativo) |
| `renomear.tsx` (3 modais) | `max-md:peer-visited:h-full` — pseudo-classe sem contexto | `max-md:h-full` |
| `Perfil.tsx` | Typo `scrol-hide` | `scrollbar-hide` |
| `SearchTasks/component.tsx` | `focus:outline-none focus:ring-0` — foco invisível | `focus:outline-blue-200 focus:ring-2` |
| Popups de filtro (4 componentes) | `text-blue-900` inconsistente | `text-blue-500` |
| `subTitle.tsx` | Comentário de código morto | Removido |
| Cards (Tasks, InfoCategorias, Lixeira) | Sem estados `hover:` | `hover:bg-blue-50/70 transition-colors` / `hover:shadow-md` |
| Lixeira, headerContent, SearchTasks | `bg-blue-400` sem `!important` conflitando com novo padrão | `bg-blue-400!` onde necessário |

### Rodada 1 — HTML & Acessibilidade _(Jun 2026)_

| Arquivo | Problema | Correção |
|---------|----------|----------|
| `index.html` | `lang="PT-br"` inválido (BCP 47) | `lang="pt-BR"` |
| `index.html` | Título padrão `Vite + React` | Título descritivo + meta description + Open Graph + canonical |
| `root.tsx` | `lang="en"` em app português | `lang="pt-BR"` |
| `root.tsx` | Sem skip link para teclado | `<a href="#main-content">Pular para o conteúdo</a>` |
| `root.tsx` | Toaster fora de live region | `<div aria-live="polite">` |
| `radio.tsx` | `type="checkbox"` em componente de rádio — quebra semântica de seleção única | `type="radio"` |
| `overlay.tsx` | Overlays modais sem semântica ARIA | `role="dialog" aria-modal="true"` + suporte `aria-labelledby` |
| `toggle.tsx` | Toggle sem semântica | `role="switch" aria-checked` |
| Projeto todo (71 ocorrências) | `<i>` para ícones — elemento obsoleto sem semântica | `<span aria-hidden="true">` |
| `Header.tsx` | Sidebar era `<div>`, não `<nav>` | `<nav aria-label="Navegação principal">` + `aria-expanded` + `aria-controls` |
| `Footer.tsx` (layout) | Rodapé era `<div>`, links sem `target`/`rel` | `<footer>` com `<a target="_blank" rel="noopener noreferrer">` |
| `Footer.tsx` (componente) | `<h2>` para copyright, `<div>` wrapper | `<footer>` + `<p><small>` |
| 6 páginas | `<h1>` dentro de `<button>` — heading em elemento interativo | `<span>` com mesmas classes visuais |
| `LayoutHome/layout.tsx` | `<main>` sem `id` para skip link | `id="main-content"` |
| `HeaderMobile.tsx`  | Botões sem `aria-label`, overlay sem `role="dialog"` | `aria-label` + `role="dialog" aria-modal` |
| `Login.tsx`, `CriarConta.tsx` | Labels sem `for`/`id`, sem `autocomplete` | `htmlFor` + `id` + `autocomplete` (email, username, current-password, new-password) |
| `AdicionarTarefa.tsx`, `AdicionarCategoria.tsx`, `CreateRotina.tsx`, `Perfil.tsx` | Inputs sem `id`, labels sem associação | `htmlFor` + `id` |
| `renomear.tsx` (3 modais) | `<label>` ao redor de `<Button>` — uso incorreto | Labels removidos |
| `Perfil.tsx` | Campo de senha com `type="text"` | `type="password"` com `autocomplete="current-password"` |
| `SearchTasks/component.tsx` | Campo de busca sem `<label>` | `<label className="sr-only">` |
| `Tasks.tsx` (checkbox) | `aria-label=""` vazio | Texto descritivo dinâmico com título da tarefa |
| `Temas.tsx` | 3 rádios com `checked={true}` simultâneo | `name="tema"` compartilhado, apenas 1 `checked` |
| `Nav.tsx` | `<ul>` com único `<li>` — lista desnecessária | Simplificado para `<div>` |
| `LandingPage.tsx` | Links `href="#"` sem destino, logo sem alternativa textual | `<span>` estático, `aria-hidden` no logo |
| `searchFloatBar.tsx` | `type=""` vazio no input | `type="search"` |
| `IconMenu.tsx` | Ícone decorativo sem `aria-hidden` | `aria-hidden="true"` |
| `tailwind.css` | Faltava estilo para skip link | Classe `.skip-link` com transição de foco |
| `btn.tsx` | `layoutId` do Framer Motion vazando para o DOM | Spread condicional apenas quando definido |

---

## 🚀 Tecnologias

### Frontend & Framework
- **React 19.2** — Biblioteca principal de UI
- **React Router 7.10** — Roteamento full-stack (Loaders, Actions, Middlewares)
- **TypeScript 5.9** — Tipagem estática

### Estilização & UI
- **Tailwind CSS v4.1** — Utilitários atômicos com JIT
- **Framer Motion 12.23** — Animações declarativas e transições de layout
- **Floating UI 0.27** — Posicionamento inteligente de popups, menus e tooltips
- **FontAwesome 7.2** — Ícones vetoriais (solid + brands)
- **Sonner 2.0** — Sistema de notificações toast

### Comunicação & Estado
- **Axios 1.13** — Cliente HTTP para API backend
- **Nuqs 2.8** — Gerenciamento tipado de URL search params
- **@felipe-lib/schema-local** — Schemas Zod compartilhados para validação

### Desenvolvimento
- **Vite 7.1** — Bundler e dev server
- **ESLint 9.39** + **eslint-plugin-react** — Linting
- **Prettier** + **prettier-plugin-tailwindcss** — Formatação

---

## 🏗️ Arquitetura

```
app/
├── component/        # Componentes reutilizáveis (btn, input, toggle, radio, overlay, etc.)
│   ├── Filtros/      # Componentes de filtro (status, data, categoria, ordenação)
│   └── FunctionTasks/# Popups de ação (opções de tarefa e categoria)
├── hooks/            # Hooks customizados (usePosition com Floating UI)
├── layout/           # Estruturas globais
│   ├── Header/       # Sidebar desktop (Header) + barra inferior mobile (HeaderMobile)
│   ├── Footer/       # Rodapé com links sociais
│   ├── LayoutHome/   # Layout principal pós-login
│   └── LayoutRegister/ # Layout de autenticação
├── middleware/       # AuthMiddleware — proteção de rotas e refresh token
├── modais/           # Diálogos acionados via rotas
│   ├── Detalhes-tarefa/
│   ├── Detalhes-categoria/
│   ├── Renomear-tarefa/
│   ├── Renomear-categoria/
│   ├── Renomear-categoria-task-rascunho/
│   └── NavMobile/
├── pages/            # Páginas/features — cada uma com:
│   │                 #   component.tsx (rota), controllers/ (loader + action),
│   │                 #   services/ (chamadas API), type.server.ts
│   ├── AdicionarCategoria/
│   ├── AdicionarTarefa/
│   ├── Chat/
│   ├── Configuracao/
│   ├── CreateRotina/
│   ├── CriarConta/
│   ├── Filtro/
│   ├── infoCategorias/
│   ├── LandingPage/
│   ├── Lixeira/
│   ├── Login/
│   ├── Perfil/
│   ├── Permissoes/
│   ├── popups/
│   ├── rascunhos/
│   ├── SearchTasks/
│   ├── Tasks/
│   └── Temas/
├── utils/            # Funções utilitárias, constantes (filtros, navegação), tipos globais
├── root.tsx          # Layout raiz (html, head, body, error boundary)
├── tailwind.css      # Configuração Tailwind (@theme, custom breakpoints, skip-link)
└── main.jsx          # Entry point do cliente
```

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com email e senha, criação de conta
- Sessão gerenciada via cookies com `accessToken`
- Middleware de renovação automática de token (`AuthMiddleware`)
- Proteção de rotas autenticadas

### 📝 Gestão de Tarefas
- Criar tarefa com título e descrição — opcionalmente vinculada a uma categoria
- Listagem com status visual (checkbox animado), data de criação e categoria
- Atualização inline de status (Concluída / Incompleta) via fetcher PATCH
- Modal de detalhes com todos os metadados
- Modal de renomeação com validação de formulário e feedback de erro
- Exclusão via ação DELETE com confirmação via toast

### 🏷️ Categorias
- CRUD completo: criar, listar, renomear e excluir
- Ações em lote: marcar todas as tarefas de uma categoria como concluídas ou incompletas
- Detalhes da categoria em modal dedicado
- Categorias são reutilizáveis entre tarefas

### 📂 Rascunhos
- Criação rápida de tarefas e categorias em estado de rascunho
- FAB (botão de ação flutuante) com popup de opções via Floating UI
- Alternância entre visualização de tarefas e categorias (tabs mobile, colunas desktop)
- Conversão implícita de rascunho para item definitivo ao mover para produção
- Layout reversível das colunas (botão de inverter ordem)

### 🔍 Busca e Filtros
- Campo de busca fixo com debounce automático (500ms)
- Parâmetros de URL tipados e compartilháveis via `nuqs`
- Página de filtros dedicada: status, categoria, período e ordenação
- Filtros com estado visual ativo/inativo nos botões

### 🗑️ Lixeira
- Listagem de tarefas excluídas com informações resumidas
- Restauração individual de tarefas
- Notificações toast de sucesso/erro nas operações

---

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js 18+
- Backend compatível com os endpoints esperados pelos serviços em `app/pages/*/services/`

### Instalação
```bash
git clone <repo-url>
cd RotinaAPP-Framework
npm install
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz:
```env
LOCAL_URL=http://localhost:3001/api
```

### Comandos
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção (SSR) |
| `npm start` | Inicia o servidor de produção |
| `npm run typecheck` | Verificação de tipos TypeScript |

---

## 📋 Changelog

### [1.0.0-beta] — 5 Jun 2026

**Refatoração de Responsividade (Rodada 3)**
- Modais agora adaptáveis em qualquer viewport (320px a 4K)
- Elementos fixos reposicionados para evitar sobreposição com nav mobile
- Tipografia responsiva: `text-sm sm:text-base` em parágrafos, `text-xs` mínimo em labels
- Largura máxima (`max-w-7xl`) no layout principal para telas ultra-wide
- Valores absolutos (`160px`) substituídos por relativos (`8rem`)

**Refatoração de Estilização (Rodada 2)**
- Contraste WCAG AA: `text-blue-300` (1.94:1) → `text-blue-500` (4.6:1) — 60 ocorrências
- Botão primário: `bg-blue-400` (2.88:1) → `bg-blue-500` (4.6:1) com estados hover/active
- Design system unificado: `border-slate-100` → `border-blue-50`, `bg-gray-400` → `bg-gray-500`
- Classes incorretas removidas: `peer-visited:h-full`, `scrol-hide`
- Estados `hover:` e `focus:` adicionados em cards e campos de busca

**Refatoração de HTML & Acessibilidade (Rodada 1)**
- `lang="pt-BR"` corrigido no `<html>`, skip link adicionado
- `<i>` substituído por `<span aria-hidden="true">` em 71 ocorrências de ícones
- `radio.tsx`: `type="checkbox"` corrigido para `type="radio"`
- Todos os overlays modais com `role="dialog"` e `aria-modal="true"`
- Labels com `htmlFor`/`id` + `autocomplete` em todos os formulários
- `<h1>` extraído de dentro de `<button>` em 6 páginas
- `<label>` wrappers indevidos removidos ao redor de `<Button>`
- Navegação semântica: `<nav>`, `<footer>`, `aria-expanded`, `aria-label`
- Open Graph, meta description, canonical e título descritivo adicionados
- Skip link com estilo CSS para visibilidade no foco

---

*Documentação mantida por Felipe Carvalho — atualizada em 5 de Junho de 2026.*
