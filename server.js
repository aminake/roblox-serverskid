const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

app.post("/log", async (req, res) => {
  const content = req.body.content || "Boş içerik";

  if (!DISCORD_WEBHOOK) {
    return res.status(500).send("Webhook ayarı yapılmamış.");
  }

  try {
    await axios.post(DISCORD_WEBHOOK, { content: content });
    res.status(200).send("Mesaj gönderildi!");
  } catch (error) {
    console.error("Discord'a gönderme hatası:", error.message);
    res.status(500).send("Discord'a gönderme başarısız");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu çalışıyor: ${PORT}`));
