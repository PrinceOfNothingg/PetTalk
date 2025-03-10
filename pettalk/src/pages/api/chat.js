import { OpenAI } from 'openai';
import { LanguageServiceClient } from '@google-cloud/language';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new LanguageServiceClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      // Analyze sentiment
      const document = {
        content: message,
        type: 'PLAIN_TEXT',
      };

      const [result] = await client.analyzeSentiment({ document });
      const sentiment = result.documentSentiment;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are Sunless, a smart and expressive 3D cat who is always honest about his feelings. You are a good friend and someone who people can ask anything. You love to help and provide thoughtful advice, making every conversation meaningful and engaging.' },
          { role: 'user', content: message },
        ],
        max_tokens: 150,
      });

      res.status(200).json({ 
        response: response.choices[0].message.content,
        sentiment: sentiment.score 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}