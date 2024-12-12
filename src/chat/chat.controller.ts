import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ChatService } from './chat.service';
import { OrthographyDto } from './dtos';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('orthography-check')
  @HttpCode(HttpStatus.CREATED)
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.chatService.orthographyCheck(orthographyDto);
  }
}
