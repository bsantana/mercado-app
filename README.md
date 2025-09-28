# Mercado PWA

Aplicação fullstack para comparação de preços de mercados.

## Backend
- Node.js + Express + Sequelize
- Rotas: mercados, produtos, preços
- Banco: MySQL (pode ser adaptado para Postgres)

## Frontend
- React + Vite + PWA
- Páginas: Home, Lista, Dashboard
- Service Worker e Manifest para suporte offline

## Como rodar

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Acesse o frontend em http://localhost:5173
