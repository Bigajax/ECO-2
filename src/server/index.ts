import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch, { RequestInit } from 'node-fetch';

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Middleware para lidar com JSON no corpo das requisições

app.post('/api/chat', async (req: Request, res: Response) => {
  const { message } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = 'openai/gpt-3.5-turbo';

  if (!apiKey) {
    return res.status(500).json({ error: 'Chave da API do OpenRouter não configurada no servidor.' });
  }

  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: message }]
      })
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na chamada da API do OpenRouter:', errorData);
      return res.status(response.status).json({ error: `Erro ao chamar a API do OpenRouter: ${response.statusText}` });
    }

    const data = (await response.json()) as OpenRouterResponse;
    res.json(data.choices[0]?.message?.content); // Envia apenas a resposta do modelo
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});