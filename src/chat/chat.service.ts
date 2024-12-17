import * as fs from 'fs';
import * as path from 'path';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import {
  GeneralDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import {
  absenceUC,
  orthographyCheckUC,
  prosConsDicusserStreamUC,
  prosConsDicusserUC,
  reportsOfDestisUC,
  textToAudioUC,
  translateUC,
} from './use-cases';

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

  public async prosConsDicusser(body: ProsConsDiscusserDto) {
    try {
      const data = { prompt: body.prompt };
      const result = await prosConsDicusserUC(this.openai, data);
      return result;
    } catch (error) {
      this._handleError(error, 'Error al realizar la comparativa.');
    }
  }

  public async prosConsDicusserStream(body: ProsConsDiscusserDto) {
    try {
      const data = { prompt: body.prompt };
      const result = await prosConsDicusserStreamUC(this.openai, data);
      return result;
    } catch (error) {
      this._handleError(error, 'Error al realizar la comparativa.');
    }
  }

  public async translateText(body: TranslateDto) {
    try {
      const data = { prompt: body.prompt, lang: body.lang };
      const result = await translateUC(this.openai, data);
      return result;
    } catch (error) {
      this._handleError(error, 'Error al realizar la comparativa.');
    }
  }

  public async textToAudio(body: TextToAudioDto) {
    try {
      const { prompt, voice } = body;
      const result = await textToAudioUC(this.openai, { prompt, voice });
      return result;
    } catch (error) {
      this._handleError(error, 'Error al realizar el audio.');
    }
  }

  public textToAudioGetter(name: string) {
    const folderPath = path.resolve(__dirname, '../../gen/audios');
    const filePath = path.join(folderPath, `${name}.mp3`);
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      this._handleError({}, 'No se encontró el archivo.', HttpStatus.NOT_FOUND);
    }
    return filePath;
  }

  public async reportsOfDestis(body: GeneralDto) {
    try {
      const { prompt } = body;
      const result = await reportsOfDestisUC(this.openai, prompt);
      return result;
    } catch (error) {
      this._handleError(error, 'Error al realizar la consulta en el portal.');
    }
  }

  public async absence(body: GeneralDto) {
    try {
      const data = { prompt: body.prompt };
      const result = await absenceUC(this.openai, data);
      return result;
    } catch (error) {
      this._handleError(error, 'Error al realizar la consulta en la política.');
    }
  }

  private _handleError(
    error: any,
    msg: string = 'Algo salio mal.',
    statusC: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    throw new HttpException(
      {
        statusCode: statusC,
        message: error.message || msg,
        error: error.message || 'Internal server error',
      },
      statusC,
    );
  }
}
