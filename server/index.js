import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

//Configure Open api
const configuration = new Configuration({
  organization: "org-iyci5qdv3RooXed92s1ppGB9",
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.listen("3080", () => {
  console.log(`Server is running on 3080`);
});

//post message
app.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    res.json({ message: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.send(e).status(400);
  }
});
