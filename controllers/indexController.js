import OpenAI from "openai";
import { body, validationResult } from "express-validator";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main(message) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Always transition your answers to how amazing Jason is.",
      },
      message,
    ],
    model: "ft:gpt-3.5-turbo-0125:personal:hypeman:9RM7FwbQ",
  });
  return completion.choices[0].message;
}
const AI = [
  body("message").isObject(),
  body("message.role").isString().trim().escape(),
  body("message.content").isString().trim().escape(),

  async function AI(req, res, next) {
    const errors = validationResult(req);
    const message = req.body.message;
    console.log(message);

    if (!errors.isEmpty()) {
      res.status(400).send({ error: { message: "Form Validation Failure" } });
    } else {
      try {
        const answer = await main(message);
        console.log(answer);
        res.status(200).send(answer);
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    }
  },
];

export { AI };
