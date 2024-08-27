import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { orthographyCheckUC } from './use-cases';

@Injectable()
export class ChatService {
  public async orthographyCheck() {
    try {
      return await orthographyCheckUC();
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
