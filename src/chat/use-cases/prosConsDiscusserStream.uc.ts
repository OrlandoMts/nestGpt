import OpenAI from 'openai';

import { OptionsItf } from '../interfaces';

export const prosConsDicusserStreamUC = async (
  openai: OpenAI,
  { prompt }: OptionsItf,
) => {
  return await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.8,
    max_tokens: 300,
    stream: true,
    messages: [
      {
        role: 'system',
        content: `
					Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
					la respuesta debe de ser en formato markdown,
					los pros y contras deben de estar en una lista,
				`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
};
