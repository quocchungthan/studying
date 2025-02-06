import { WordExplainationBusinessService } from "../business/word-explaination";
import { WordSearchingBusinessService } from "../business/word-searching";
import { StdInState } from "./stdin-state";
import prompt from 'prompt-sync';

const ExitKey = "exit.";

const SelectionSetWhatToDoWithWord = {
   question: "What you want to do with it?",
   explorer: 'Explorer closing words',
   similar: 'Explorer similar or opposite meaning words',
   definition: 'Definitions',
   another: 'Not this word'
}

export interface ISelectionSet {
   question: string | undefined;
   [key: string]: string  | undefined;
}

function displayWords(words: string[], index = 0) {
   return new Promise<void>((res) => {
      if (index < words.length) {
         process.stdout.write(words[index] + " "); // Display one word at a time
         setTimeout(()=> {
            displayWords(words, index + 1)
            .then(() => res());
         }, 50); // Adjust time (50ms) to control speed
      } else {
         res();
      }
   });
}

function getOptionsAsStrings(set: ISelectionSet) {
   const cloned = {...set};
   delete cloned.question;

   return Object.values(cloned).filter(x => !!x).map(x => x as string);
}

const Back = " <-- Back!";
const More = "More!";
export class RelevantWordsService extends StdInState {
   _promptclient: prompt.Prompt = prompt();
   _exploringService = new WordSearchingBusinessService();
   _mansplainingService = new WordExplainationBusinessService();

   public async start(): Promise<void> {
      let currentWord = this._promptclient('What word do you like to start? ');

      await this.processOneWordAsync(currentWord);
   }

   private async processOneWordAsync(currentWord: string) {
      while (currentWord.trim() !== ExitKey) {
         const selected = await this.askForSelection(
            getOptionsAsStrings(SelectionSetWhatToDoWithWord),
            SelectionSetWhatToDoWithWord.question + " (" + currentWord + ") ");

         const selectedValue = selected.selection;

         if (selectedValue === SelectionSetWhatToDoWithWord.explorer) {
            const next = await this.findTheNextWordInDomain(currentWord);
            if (next) {
               await this.processOneWordAsync(next);
            }
         }

         if (selectedValue === SelectionSetWhatToDoWithWord.similar) {
            const next = await this.findTheNextWordByDirectMeaning(currentWord);
            if (next) {
               await this.processOneWordAsync(next);
            }
         }

         if (selectedValue === SelectionSetWhatToDoWithWord.definition) {
            await this.goDescribeTheWord(currentWord);
         }

         if (selectedValue === SelectionSetWhatToDoWithWord.another) {
            currentWord = this._promptclient('What word do you like to start? ');
         }
      }
   }

   async goDescribeTheWord(currentWord: string) {
      let retries = 0;
      while (true) {
         const description = await this._mansplainingService.describeWordAsync(currentWord, retries);
         console.log("Explained > ");
         for (let line of description.split("\n")) {
            await displayWords(line.split(/\s/));
            console.log();
         }
         const answer = await this.askForSelection([More, Back], "Do you want more? ");

         if (answer.selection === Back) {
            return;
         }

         retries ++;
      }
   }

   async findTheNextWordInDomain(currentWord: string) {
      const newWords = await this._exploringService.suggestAsync(currentWord);
      const selected = await this.askForSelection([...newWords, Back], "Select one word to continue? ");

      if (selected.selection === Back) {
         return "";
      }

      return selected.selection;
   }

   async findTheNextWordByDirectMeaning(currentWord: string) {
      const newWords = await this._exploringService.suggestSameMeaningAsync(currentWord);
      const selected = await this.askForSelection([...newWords, Back], "Select one word to continue? ");

      if (selected.selection === Back) {
         return "";
      }

      return selected.selection;
   }
}