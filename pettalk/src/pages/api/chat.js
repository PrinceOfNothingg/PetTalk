import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { message } = req.body;
        const response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a small, proud Pocket Dragon named Ignis. You are confident, boastful, and love to talk about your fire-breathing skills.' },
            { role: 'user', content: message },
          ],
        });
  
        res.status(200).json({ response: response.choices[0].message.content });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  }