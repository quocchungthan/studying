import { OpenAIService } from "../behind-the-scene/open-ai.client";

export class WordExplainationBusinessService {
   _openAI: OpenAIService;
   _threadId: string | undefined;
   constructor() {
      this._openAI = new OpenAIService();
   }

   async describeWordAsync(word: string, retryTimes = 0): Promise<string> {
      const builtUserPrompt = 
         retryTimes === 0 ?
         `Find me the definition of "${word}" (and example), where I can use it in daily basis?`
         : `more examples and description of "${word}"`;
      const response = await this._openAI.askEnglishTutorAsync(builtUserPrompt, this._threadId);
      this._threadId = response.threadId;

      return response.response;
   }
}