import { IsEnum, IsString } from 'class-validator';

enum LanguageEnum {
  EN = 'ingles',
  ES = 'español',
  FR = 'frances',
  IT = 'italiano',
  AR = 'arabe',
  DE = 'aleman',
  PT = 'portugues',
  RU = 'ruso',
  ZH = 'chino',
}

export class TranslateDto {
  @IsString()
  readonly prompt: string;

  @IsEnum(LanguageEnum)
  readonly lang: LanguageEnum;
}
