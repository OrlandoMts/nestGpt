import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OrthographyDto } from './dtos';
import { orthographyCheckUC } from './use-cases';

@Injectable()
export class ChatService {
  // Solo va llamar casos de uso
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  public async orthographyCheck(body: OrthographyDto) {
    const data = { prompt: body.prompt };
    try {
      const result = await orthographyCheckUC(this.openai, data);
      const resp = JSON.parse(result);
      return resp;
    } catch (error: any) {
      this._handleError(
        error,
        'Error al realizar la verificación ortográfica.',
      );
    }
  }

  private _handleError(error: any, msg: string = 'Algo salio mal.') {
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || msg,
        error: error.message || 'Internal server error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
