import { OpenAIService } from "../behind-the-scene/open-ai.client";

export class WordSearchingBusinessService {
   _openAI: OpenAIService;
   _threadId: string | undefined;
   constructor() {
      this._openAI = new OpenAIService();
   }

   async suggestAsync(word: string): Promise<string[]> {
      const builtUserPrompt = `Suggest me some words or phrases that have same domain to "${word}" (or same topic/domain), at any english level, as high as possible. Good to have also the pronounciation, NOT neccessary to have similar meaning`;

      const response = await this._openAI.askEnglishTutorAsync(builtUserPrompt, this._threadId);
      this._threadId = response.threadId;

      const justNeedToNotEmpty = response.response.split(/[\n\t\r]/).map(x => x.trim()).filter(x => !!x);

      const firstTry = justNeedToNotEmpty
         .filter(x => /\/.*\//.test(x) || /\*.*\*/.test(x));

      // TODO: does not work at the moment, but it's also good to show pronouciation and type of word.
      const normalized = firstTry.map(x => x.match(/\*(.*)\*/gi)?.[1])
         .filter(x => !!x).map(x => x as string);

      return normalized.length !== 0 ? normalized : firstTry.length !== 0 ? firstTry : justNeedToNotEmpty;
   }

   async suggestSameMeaningAsync(word: string): Promise<string[]> {
      const builtUserPrompt = `Suggest me some words or phrases that have similar or definite opposite to "${word}" (or same topic/domain), at any english level, as high as possible. Good to have also the pronounciation`;

      const response = await this._openAI.askEnglishTutorAsync(builtUserPrompt, this._threadId);
      this._threadId = response.threadId;

      const justNeedToNotEmpty = response.response.split(/[\n\t\r]/).map(x => x.trim()).filter(x => !!x);

      const firstTry = justNeedToNotEmpty
         .filter(x => /\/.*\//.test(x) || /\*.*\*/.test(x));

      // TODO: does not work at the moment, but it's also good to show pronouciation and type of word.
      const normalized = firstTry.map(x => x.match(/\*(.*)\*/gi)?.[1])
         .filter(x => !!x).map(x => x as string);

      return normalized.length !== 0 ? normalized : firstTry.length !== 0 ? firstTry : justNeedToNotEmpty;
   }
}