interface OptionsItf {
  prompt: string;
}

export const orthographyCheckUC = async (options: OptionsItf) => {
  const { prompt } = options;
  return { prompt: prompt, key: process.env.OPENAI_API_KEY };
};
