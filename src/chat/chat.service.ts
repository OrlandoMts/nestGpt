import { Injectable } from '@nestjs/common';
import { orthographyCheckUC } from './use-cases';

@Injectable()
export class ChatService {
  public async orthographyCheck() {
    return await orthographyCheckUC();
    // return {
    //   message: 'Created',
    //   ok: true,
    //   data: {
    //     message: 'Orthography check',
    //   },
    // };
  }

  /* create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  } */
}
