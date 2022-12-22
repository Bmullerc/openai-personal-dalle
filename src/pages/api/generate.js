import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createImage({
    prompt: req.body.text,
    n: 4,
    size: "1024x1024",
  });
  res.status(200).json({result: completion.data.data})
}