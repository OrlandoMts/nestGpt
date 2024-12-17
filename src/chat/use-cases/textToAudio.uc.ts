import * as fs from 'fs';
import * as path from 'path';

import OpenAI from 'openai';

import { OptionsItf } from '../interfaces';

// https://platform.openai.com/usage
export const textToAudioUC = async (openai: OpenAI, options: OptionsItf) => {
  const { prompt, voice } = options;
  const voices = {
    nova: 'nova',
    onyx: 'onyx',
    alloy: 'alloy',
    echo: 'echo',
    fable: 'fable',
    shimmer: 'shimmer',
  };

  const voiceId = voices[voice] || 'nova';
  const folderPath = path.resolve(__dirname, '../../../gen/audios/');
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1-hd',
    voice: voiceId,
    input: prompt,
    response_format: 'mp3',
    speed: 1,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);

  return {
    speechFile,
  };
};
