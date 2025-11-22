### 3. Execução do Backend (API)

O backend é construído com Node.js, Express e Mongoose, sendo o coração do sistema de triagem.

#### A. Instalação de Dependências

1.  Abra o terminal na pasta **raiz** do projeto (`escola-super-herois`).
2.  Instale todas as dependências do Node.js necessárias para o servidor:
    ```bash
    npm install
    ```

#### B. Inicialização do Servidor

1.  Certifique-se de que o **serviço do MongoDB está ativo** e acessível.
2.  Inicie o servidor Node.js. O comando exato pode variar dependendo do seu `package.json`:

    ```bash
    npm run dev 
    # Comando recomendado para desenvolvimento (geralmente usa nodemon para reinício automático)
    ```

    * **Alternativa:** Se não houver script `dev` configurado:
        ```bash
        node server.js
        ```

3.  Após a inicialização bem-sucedida, você deverá ver a mensagem de conexão no terminal:
    ```
    Conectado ao MongoDB!
    Servidor rodando na porta 3000
    ```

    * O servidor estará ativo em `http://localhost:3000`.

#### C. Endpoints Principais

Com o backend em execução, ele está pronto para receber requisições do frontend:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/herois/triagem` | Busca o herói mais antigo com status **`Indefinido`** (Triagem). |
| `GET` | `/api/herois/gerar` | Gera e salva um **novo** herói com status **`Indefinido`**. |
| `GET` | `/api/herois/turmas?tipo=Principal` | Lista todos os heróis designados como **Principais**. |
| `PUT` | `/api/herois/:id` | **Designa** o herói (ex: atualiza o campo `tipo` para "Principal" ou "Sidekick"). |
| `DELETE` | `/api/herois/:id` | **Deleta** o herói do banco de dados (função "Vilão"). |