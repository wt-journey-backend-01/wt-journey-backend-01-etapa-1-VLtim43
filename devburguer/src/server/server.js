const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const root = path.resolve(__dirname, "..");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(root, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(root, "views", "index.html"));
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(root, "views", "contato.html"));
});

app.get("/api/lanches", (req, res) => {
  const lanches = require(path.join(root, "public", "data", "lanches.json"));
  res.json(lanches);
});

app.use((req, res) => {
  res.status(404).send("Página não encontrada. <a href='/'>Voltar</a>");
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
