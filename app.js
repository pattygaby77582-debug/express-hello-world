const express = require("express");
const app = express();

app.use(express.json());

// ROTA RAIZ (só pra teste)
app.get("/", (req, res) => {
  res.send("Webhook WhatsApp ativo");
});

// 🔐 ROTA DE VERIFICAÇÃO DA META (ESSENCIAL)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 📩 RECEBER EVENTOS
app.post("/webhook", (req, res) => {
  console.log("Evento recebido:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
