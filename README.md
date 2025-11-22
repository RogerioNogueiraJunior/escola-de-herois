# 🦸 Escola de Super-Heróis — Sistema de Triagem
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

<img width="1239" height="739" alt="image" src="https://github.com/user-attachments/assets/adb6354e-94a8-46b3-952d-58d5124a56f5" />

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
  <img width="1484" height="906" alt="image" src="https://github.com/user-attachments/assets/634a0ff9-3b0a-438b-bcb5-4d71d8a4e721" />
- `GET  /api/herois/:id` — obter herói por ID
  <img width="1541" height="864" alt="image" src="https://github.com/user-attachments/assets/545487ff-c00f-4c9e-ba8a-602489c0bcda" />
- `PUT  /api/herois/:id` — atualizar herói (ex.: definir `tipo`)
  <img width="1534" height="873" alt="image" src="https://github.com/user-attachments/assets/2d6b9db3-9fca-4828-ae0c-19450046f7e2" />
- `DELETE /api/herois/:id` — remover herói
  <img width="1534" height="828" alt="image" src="https://github.com/user-attachments/assets/293487fe-11cb-49cf-bc5c-2e47cdce19ca" />
- `GET  /api/herois/triagem` — obter o próximo herói com `tipo: Indefinido` (triagem FIFO)
  <img width="1541" height="846" alt="image" src="https://github.com/user-attachments/assets/55c30803-5b45-4447-9b98-8f49268901ea" />

