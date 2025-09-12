# 📋 RotinaAPP

Uma aplicação web moderna para gerenciamento de tarefas e rotinas pessoais, desenvolvida para aprendizado contínuo e experimentação com tecnologias React.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=flat&logo=tailwind-css)

## 🚀 Funcionalidades

- ✅ Gerenciamento de tarefas por categorias
- 🔍 Busca e filtros avançados
- 👤 Sistema de autenticação
- 🗑️ Lixeira com restauração
- 🎨 Temas personalizáveis
- 📱 Interface responsiva

## 🛠️ Tecnologias

- **React 18** + TypeScript
- **Zustand** para estado global
- **TailwindCSS** para estilização
- **Framer Motion** para animações
- **React Router v7** para roteamento
- **Vite** como build tool

## 🔧 Como executar

1. **Instalar dependências**
```bash
npm install
# ou
pnpm install
```

2. **Executar em desenvolvimento**
```bash
npm run dev
# ou
pnpm run dev
```

3. **Acessar**: `http://localhost:5173`

## 🐳 Docker

```bash
docker build -t rotinaapp .
docker run -p 5173:5173 rotinaapp
```

## 📁 Estrutura

```
src/
├── pages/           # Páginas da aplicação
├── components/      # Componentes reutilizáveis
├── store/          # Estados globais (Zustand)
├── routes/         # Configuração de rotas
└── hooks/          # Custom hooks
```

## 🎯 Status

🚧 **Em desenvolvimento ativo** - Projeto focado em aprendizado contínuo e experimentação com novas tecnologias.

### 📚 Propósito Educacional
Este projeto serve como laboratório para:
- Explorar funcionalidades do React 18.
- Experimentar com diferentes padrões de gerenciamento de estado.
- Praticar desenvolvimento com TypeScript.
- Testar novas bibliotecas e ferramentas do ecossistema React.
- Aprimorar habilidades em CSS com TailwindCSS.
- Implementar animações fluidas com Framer Motion.

⭐ Projeto em constante evolução!
