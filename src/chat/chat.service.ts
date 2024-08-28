import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OrthographyDto } from './dto';
import { orthographyCheckUC } from './use-cases';

@Injectable()
export class ChatService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  public async orthographyCheck(body: OrthographyDto) {
    const data = { prompt: body.prompt };
    try {
      return await orthographyCheckUC(this.openai, data);
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
        message: msg,
        error: error.message || 'Internal server error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
