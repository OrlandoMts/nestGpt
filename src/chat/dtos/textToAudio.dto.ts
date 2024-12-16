import { IsEnum, IsOptional, IsString } from 'class-validator';

enum VoiceEnum {
  NOVA = 'nova',
  SHIMMER = 'shimmer',
  ECHO = 'echo',
  ONYX = 'onyx',
  ALLOY = 'alloy',
  FABLE = 'fable',
}

export class TextToAudioDto {
  @IsString()
  readonly prompt: string;

  @IsEnum(VoiceEnum)
  @IsOptional()
  readonly voice: VoiceEnum;
}
