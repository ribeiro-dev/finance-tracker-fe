# 💰 Finance Tracker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=yellow)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Shadcn](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=radixui&logoColor)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

Uma aplicação em React, para gerenciamento de finanças pessoais

Essa aplicação consome a **[Finance Tracker API](https://github.com/ribeiro-dev/finance-tracker-api)** e fornece uma UI intuitiva, para rastrear rendas, despesas e um resumo financeiro

Criado para demonstrar práticas modernas de front-end, integração de API no mundo real, arquitetura de componentes limpa e uma experiência de usuário fluida.

<p>
  <img src="screenshots/login.png" alt="Página de Login" width="45%" style="max-width:600px; margin:8px;" />
  <img src="screenshots/painel.png" alt="Página Inicial" width="45%" style="max-width:600px; margin:8px;" />
</p>

<p>
  <img src="screenshots/categorias-1.png" alt="Página de Categorias 1" width="45%" style="max-width:600px; margin:8px;" />
  <img src="screenshots/categorias-2.png" alt="Página de Categorias 2" width="45%" style="max-width:600px; margin:8px;" />
</p>

<p>
  <img src="screenshots/transacoes-1.png" alt="Página de Transações 1" width="45%" style="max-width:600px; margin:8px;" />
  <img src="screenshots/transacoes-2.png" alt="Página de Transações 2" width="45%" style="max-width:600px; margin:8px;" />
</p>

## ✨ Features

- Autenticação JWT
- CRUD de Transações
- Gerenciamento de Categorias
- Dashboard com resumo financeiro e gráficos
- Mobile-first Design
- Integração de API robusta com tratamento de erros
- Interface clean com Shadcn

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- React Hook Form + Zod
- TanStack Query
- TailwindCSS
- Shadcn
- Recharts
- Axios
- Vite

## 🧠 Design Highlights

- Estrutura Escalável
- Componentes reutilizáveis
- Mobile-first UX

## 🚀 Rodando o Projeto

```bash
git clone https://github.com/ribeiro-dev/finance-tracker-fe.git
cd finance-tracker-fe
npm install
```

Crie o arquivo `.env`:

```text
VITE_API_URL=http://localhost:3333
```

Inicie o servidor:

```bash
npm run dev
```

## 📁 Estrutura do Projeto

```text
src/
  components/
  interfaces/
  lib/
  pages/
  services/
  stores/
  styles/
```

## 📦 Build

```bash
npm run build
```

## 🙌 Aprendizados

- Shadcn
- Tailwind
- TanStack Query
- AdonisJS API
