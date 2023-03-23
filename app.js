const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api", async (req, res) => {
  const { prompt } = req.body;
  const response = await axios.post(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    {
      prompt,
      max_tokens: 1024,
      n: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  res.send(response.data);
});

app.listen(3000, () => {
  console.log(`Server start!!`);
});
