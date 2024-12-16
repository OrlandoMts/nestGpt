import { IsString } from 'class-validator';

export class GeneralDto {
  @IsString()
  readonly prompt: string;
}
