import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { ChatService } from './chat.service';
import {
  GeneralDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';

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

  @Post('text-to-audio')
  @HttpCode(HttpStatus.CREATED)
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response,
  ) {
    const { speechFile } = await this.chatService.textToAudio(textToAudioDto); //filePath
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(speechFile);
  }

  @Get('text-to-audio/:name')
  @HttpCode(HttpStatus.OK)
  public textToAudioGetter(@Param('name') nameFile, @Res() res: Response) {
    const file = this.chatService.textToAudioGetter(nameFile);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(file);
  }

  @Get('indelpro')
  @HttpCode(HttpStatus.OK)
  public reportsOfDestis(@Body() body: GeneralDto) {
    return this.chatService.reportsOfDestis(body);
  }

  @Post('absence')
  @HttpCode(HttpStatus.OK)
  public async absence(@Body() body: GeneralDto, @Res() res: Response) {
    const stream = await this.chatService.absence(body);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const part of stream) {
      res.write(part.choices[0]?.delta?.content || '');
    }
    res.end();
  }
}
