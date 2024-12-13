import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { ChatService } from './chat.service';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('orthography-check')
  @HttpCode(HttpStatus.CREATED)
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.chatService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  @HttpCode(HttpStatus.CREATED)
  prosConsDicusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.chatService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  @HttpCode(HttpStatus.CREATED)
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.chatService.prosConsDicusserStream(prosConsDiscusserDto);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const part of stream) {
      res.write(part.choices[0]?.delta?.content || '');
    }
    res.end();
  }

  @Post('translate')
  @HttpCode(HttpStatus.CREATED)
  translateText(@Body() translateDto: TranslateDto) {
    return this.chatService.translateText(translateDto);
  }
}
