const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const root = path.resolve(__dirname, "devburguer/src");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(root, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(root, "views", "index.html"));
});

app.get("/api/lanches", (req, res) => {
  const lanches = require(path.join(root, "public", "data", "lanches.json"));
  res.json(lanches);
});

// sugestao
app.get("/sugestao", (req, res) => {
  const nome = req.query.nome;
  const ingredientes = req.query.ingredientes;

  if (!nome) {
    return res.redirect("/");
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <title>DevBurger</title>
        <link rel="stylesheet" href="/css/global.css" />
        <link rel="stylesheet" href="/css/layout.css" />
        <link rel="stylesheet" href="/css/home.css" />
    </head>

    <body>
        <header>
            <h1> 🍔 DevBurger </h1>
            <nav>
                <a href="/">Início</a> |
                <a href="/contato">Contato</a> |
                <a href="/api/lanches">API</a>
            </nav>
        </header>
        
          <section class="sugestao_section">
            <div class="item sugestao_feedback">
                <h3>🍔 Obrigado pela sugestão!</h3>
                <div class="form-group">
                    <label>Nome:</label>
                    <p>${nome}</p>
                </div>
                <div class="form-group">
                    <label>Ingredientes:</label>
                    <p>${ingredientes}</p>
                </div>
                
            <a href="/" class="back-button">← Retornar à página inicial</a>

            </div>
          </section>
    </body>
    </html>
  `);
});

// contato
app.get("/contato", (req, res) => {
  res.sendFile(path.join(root, "views", "contato.html"));
});

app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  res.status(200).type("html").send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <title>DevBurger - Contato</title>
        <link rel="stylesheet" href="/css/global.css" />
        <link rel="stylesheet" href="/css/layout.css" />
        <link rel="stylesheet" href="/css/home.css" />
    </head>

    <body>
        <header>
            <h1> 🍔 DevBurger </h1>
            <nav>
                <a href="/">Início</a> |
                <a href="/contato">Contato</a> |
                <a href="/api/lanches">API</a>
            </nav>
        </header>
        
        <section class="sugestao_section" >
            <div class="sugestao_feedback">
                <h3>🍔 Obrigado pelo contato!</h3>
                <div class="form-group">
                    <label>Nome:</label>
                    <p>${nome}</p>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <p>${email}</p>
                </div>
                <div class="form-group">
                    <label>Assunto:</label>
                    <p>${assunto}</p>
                </div>
                <div class="form-group">
                    <label>Mensagem:</label>
                    <p>
                        ${mensagem}
                    </p>
                </div>
                <a href="/" class="back-button">← Retornar à página inicial</a>
            </div>
        </section>
    </body>
    </html>
  `);
});

app.use((_, res) => {
  res.status(404).send("Página não encontrada. <a href='/'>Voltar</a>");
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
