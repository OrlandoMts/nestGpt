import axios from 'axios';
import OpenAI from 'openai';

// Función para obtener los datos del endpoint
const connectToEndPointTic = async () => {
  try {
    const token = process.env.TOKEN_API_IND;

    if (!token) {
      throw new Error('El token de autenticación no está definido.');
    }

    const res = await axios.get(
      'https://www.portal.indelpro.com/v1/api/nms_thr/desti/report',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 2, page: 1 },
      },
    );

    return res.data?.data || [];
  } catch (error) {
    console.error('Error al obtener datos del endpoint:', error);
    throw error; // Propaga el error para manejarlo en la llamada superior
  }
};

export const reportsOfDestisUC = async (openai: OpenAI, prompt: string) => {
  try {
    const reports = await connectToEndPointTic();

    if (!reports.data.length) {
      console.warn('No se encontraron reportes.');
      return 'No reports available.';
    }

    // Generar un único *prompt* con todos los reportes concatenados
    const formattedReports = reports.data
      .map((report, index) => {
        return `Reporte ${index + 1}:\n${JSON.stringify(report, null, 2)}`;
      })
      .join('\n\n');

    const fullPrompt = `
      Eres un asistente que analiza datos de reportes de monitoreo y los resume de forma clara. A continuación tienes los reportes:

      ${formattedReports}

      ${prompt}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Eres un analista especializado en la generación de resúmenes a partir de datos estructurados de reportes.',
        },
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
    });

    const summary =
      response.choices[0]?.message?.content || 'Sin resumen disponible.';
    return summary;
  } catch (error) {
    console.error('Error en getReportsUC:', error);
    throw error;
  }
};
