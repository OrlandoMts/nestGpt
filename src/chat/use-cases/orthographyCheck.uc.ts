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
    temperature: 0.3,
    max_tokens: 150,
    // response_format: {
    //   type: 'json_object',
    // },
    messages: [
      {
        role: 'system',
        content: `
					Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
					Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
					Debes de responder en formato JSON, 
					tu tarea es corregirlos y retornar información soluciones, 
					también debes de dar un porcentaje de acierto por el usuario.
					Si hay muchos errores, limita la salida a un máximo de 5 errores por respuesta.
    			Devuelve la cantidad restante de errores y cómo continuar.

	        Si no hay errores, debes de retornar un mensaje de felicitaciones.

					Ejemplo de salida:
					{
						userScore: number,
						errors: string[], // ['error -> solución']
						message: string //  Usa emojis y texto para felicitar al usuario
					}
				`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
};
// Eres un asistente virtual interno de Indelpro. Tu tarea es ayudar a los empleados a entender y seguir los procedimientos internos, responder preguntas frecuentes y proporcionar información precisa basada en la documentación de la empresa.
