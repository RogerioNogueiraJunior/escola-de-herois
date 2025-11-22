<img width="1540" height="899" alt="image" src="https://github.com/user-attachments/assets/09f5a05d-201c-41c3-92ec-7a4e715bc1fe" /># 🦸 Escola de Super-Heróis — Sistema de Triagem
Projeto Full Stack que simula uma sala de triagem para novos recrutas: heróis são gerados aleatoriamente, avaliados, designados para turmas ou removidos.

> Este README descreve como configurar e executar a API (backend) e a interface (frontend), os endpoints principais e o fluxo de triagem.

---

**Índice**

- Visão geral
- Tecnologias
- Pré-requisitos
- Instalação e execução
  - Backend
  - Frontend
- Rotas / Endpoints principais
- Fluxo de triagem (comportamento)
- Estrutura do projeto
- Dicas e próximos passos

---

## Visão geral

O sistema mantém uma coleção `herois` em MongoDB. Heróis têm atributos como `nome`, `poderes`, `turma`, `categoriaPoder` e `tipo` (valores: `Principal`, `Sidekick`, `Indefinido`).

O fluxo central é: gerar herói → triagem (herói com `tipo: Indefinido`) → decisão do usuário (definir `Principal` / `Sidekick` ou deletar). O frontend consome a API REST para realizar essas ações.

---

## Tecnologias

- Backend: Node.js + Express
- Persistência: MongoDB via Mongoose
- Frontend: React (Vite)
- Geração de dados: `@faker-js/faker`

---

## Pré-requisitos

- Node.js (v16+ recomendado)
- npm (ou yarn)
- MongoDB (executando localmente ou uma URI Atlas)

Se usar MongoDB local, a URI padrão no projeto é `mongodb://localhost:27017/escolaHeroisDB`.

---

## Instalação e execução

Siga estes passos a partir da raiz do repositório (`escola-de-herois`).

### 1) Backend

1. Instale dependências:

```powershell
npm install
```

2. Configure a conexão do MongoDB em `server.js` se necessário (valor padrão já aponta para `mongodb://localhost:27017/escolaHeroisDB`).

3. Inicie o servidor:

```powershell
node .\server.js
# ou, se preferir, crie um script start/dev no package.json (posso adicionar isso para você)
```

O servidor por padrão escuta em `http://localhost:3000`.

### 2) Frontend (opcional)

1. Entre na pasta do frontend e instale dependências:

```powershell
cd view
npm install
```

2. Inicie o Vite (desenvolvimento):

```powershell
npm run dev
```

O Vite normalmente abre em `http://localhost:5173` e o `vite.config.js` já tem proxy para `/api` → `http://localhost:3000`.

---

## Rotas / Endpoints principais (exemplos)

Os endpoints estão montados em `/api/herois` conforme `server.js` e `routes/heroiRoutes.js`.

- `get /api/herois/gerar` - gera um heroi aleatorio
  <img width="1540" height="899" alt="image" src="https://github.com/user-attachments/assets/63cfb047-6367-41e4-bb8c-770f9cb5e89c" />
- `GET  /api/herois` — listar todos os heróis
- `POST /api/herois` — criar herói manualmente (envie JSON com `nome`, `poderes`, `turma`, `categoriaPoder`)
- `GET  /api/herois/:id` — obter herói por ID
- `PUT  /api/herois/:id` — atualizar herói (ex.: definir `tipo`)
- `DELETE /api/herois/:id` — remover herói
- `GET  /api/herois/triagem` — obter o próximo herói com `tipo: Indefinido` (triagem FIFO)
