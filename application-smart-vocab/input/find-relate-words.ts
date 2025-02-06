import { StdInState } from "./stdin-state";
import prompt from 'prompt-sync';

export class RelevantWordsService extends StdInState {
   _promptclient: prompt.Prompt;

   constructor() {
      super();
      this._promptclient = prompt();
   }
   public start(): void {
      const initialWord = this._promptclient('What word do you like to start? ');
      console.log(initialWord);
   }
}