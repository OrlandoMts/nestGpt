import OpenAI from 'openai';

interface OptionsItf {
  prompt: string;
  lang: string;
}

// https://platform.openai.com/usage
export const translateUC = async (openai: OpenAI, options: OptionsItf) => {
  const { prompt, lang } = options;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    // max_tokens: 150,
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}: ${prompt}`,
      },
    ],
  });

  return { message: completion.choices[0].message.content };
};
