import OpenAI from 'openai';

interface OptionsItf {
  prompt: string;
}

// https://platform.openai.com/usage
export const orthographyCheckUC = async (
  openai: OpenAI,
  options: OptionsItf,
) => {
  const { prompt } = options;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: 'Write a haiku about recursion in programming.',
      },
    ],
  });
  console.log(completion);
  console.log('******************');
  console.log(completion.choices[0].message);
  return completion.choices[0];
};
