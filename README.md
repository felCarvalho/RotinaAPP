# Documentação: RotinaAPP-Framework

O **RotinaAPP-Framework** é uma aplicação web moderna voltada para o gerenciamento de tarefas e rotinas diárias. O sistema permite que os usuários organizem seu dia a dia através da criação de tarefas, categorização, busca avançada e gestão de rascunhos, tudo isso em uma interface fluida e responsiva.

---

## 🚀 Tecnologias Utilizadas

### Frontend & Framework
- **React 19**: Biblioteca principal para construção da interface.
- **React Router 7**: Utilizado tanto para roteamento quanto para a lógica de servidor (Loaders, Actions e Middlewares), adotando o modelo full-stack.
- **TypeScript**: Garantia de tipagem estática e segurança no desenvolvimento.

### Estilização & UI
- **Tailwind CSS v4**: Framework de utilitários para estilização rápida e moderna.
- **Framer Motion**: Biblioteca para animações fluidas e transições de layout.
- **Floating UI**: Gerenciamento de elementos flutuantes (popups, menus de contexto).
- **FontAwesome**: Conjunto de ícones vetoriais.
- **Sonner**: Sistema de notificações (toasts) elegante.

### Comunicação & Estado
- **Axios**: Cliente HTTP para consumo da API backend.
- **Zod**: Validação de esquemas e dados.
- **Nuqs**: Gerenciamento de parâmetros de busca (URL search params) com tipagem segura.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma estrutura modular organizada por funcionalidades dentro da pasta `app/`:

- **`/component`**: Componentes reutilizáveis de UI (botões, inputs, modais, etc.).
- **`/layout`**: Definições de estruturas globais (ex: Layout de Autenticação, Layout da Home).
- **`/pages`**: Cada pasta representa uma funcionalidade/página, contendo:
    - `component.tsx`: Componente React principal da rota.
    - `controllers/`: Lógica de `loader` (busca de dados) e `action` (mutação de dados).
    - `services/`: Chamadas diretas à API.
- **`/middleware`**: Lógica de proteção de rotas e renovação de tokens (AuthMiddleware).
- **`/modais`**: Componentes de diálogo que são disparados via rotas.
- **`/utils`**: Funções utilitárias, contextos globais e constantes.

---

## ✨ Funcionalidades Principais

### 🔐 Autenticação e Segurança
- **Login e Registro**: Fluxos completos com validação de sessão.
- **Gestão de Sessão**: Utiliza cookies para armazenar tokens de acesso.
- **Refresh Token Automático**: Middleware que renova o `accessToken` silenciosamente, garantindo a permanência do login.

### 📝 Gestão de Tarefas (Tasks)
- **CRUD Completo**: Criar, visualizar, editar e excluir tarefas.
- **Status em Tempo Real**: Marcar tarefas como "Concluída" ou "Incompleta" diretamente na listagem.
- **Detalhes**: Visualização aprofundada de cada rotina cadastrada.

### 🏷️ Categorização
- **Organização**: Vínculo de tarefas a categorias específicas.
- **Gestão de Categorias**: Interface para adição e visualização de categorias.

### 📂 Rascunhos (Drafts)
- Espaço dedicado para tarefas ou categorias que ainda não foram finalizadas ou que estão guardadas separadamente.

### 🔍 Busca e Filtros
- Sistema de busca que utiliza parâmetros de URL (`nuqs`), permitindo filtrar por título, categoria ou status de forma persistente.

---

## 🛠️ Configuração e Instalação

### Instalação
Clone o repositório e instale as dependências:
```bash
npm install
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
LOCAL_URL=http://seu-backend-api.com
LOCAL_STRAPI_API=http://seu-strapi-url.com
```

### Comandos Disponíveis
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria a versão de produção.
- `npm start`: Inicia o servidor de produção após o build.
- `npm run typecheck`: Executa a verificação de tipos com TypeScript.

---
*Documentação oficial do projeto RotinaAPP-Framework.*
