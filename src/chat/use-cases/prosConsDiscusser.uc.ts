import OpenAI from 'openai';

interface OptionsItf {
  prompt: string;
}

export const prosConsDicusserUC = async (
  openai: OpenAI,
  { prompt }: OptionsItf,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.8,
    max_tokens: 300,
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

  return response.choices[0].message;
};
