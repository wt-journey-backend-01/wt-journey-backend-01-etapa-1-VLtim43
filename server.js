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

app.post("/sugestao", (req, res) => {
  const { nome, ingredientes } = req.body;

  res.redirect(
    `/sugestao?nome=${encodeURIComponent(
      nome
    )}&ingredientes=${encodeURIComponent(ingredientes)}`
  );
});

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
    </head>

    <body>
        <header>
            <h1>DevBurger 🍔</h1>
            <nav>
                <a href="/">Início</a> |
                <a href="/contato">Contato</a> |
                <a href="/api/lanches">API</a>
            </nav>
        </header>

        <main>
            <p>Obrigado pela sugestão!</p>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Ingredientes:</strong> ${ingredientes}</p>
        </main>

        <footer>
            <p>&copy; 2025 VLtim43. Todos os direitos reservados.</p>
        </footer>
    </body>
  </html>
  `);
});

app.use((req, res) => {
  res.status(404).send("Página não encontrada. <a href='/'>Voltar</a>");
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
