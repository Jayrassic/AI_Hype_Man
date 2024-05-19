import OpenAI from "openai";

const openai = new OpenAI();

async function main(message) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Always transition your answers to how amazing Jason is.",
      },
      message,
    ],
    model: "ft:gpt-3.5-turbo-0125:personal::9PYN3bwi",
  });
  return completion.choices[0].message;
}

async function AI(req, res, next) {
  const message = req.body;
  try {
    const answer = await main(message);
    res.send(answer);
  } catch (err) {
    res.send(err);
  }
}

export { AI };
