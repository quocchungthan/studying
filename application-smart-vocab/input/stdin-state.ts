import inquirer from "inquirer";

export abstract class StdInState {
   public agentName: string = '';

   public abstract start(): void;

   protected askForTextInput() {

   }

   protected askForSelection(choices: string[], prompt: string = 'Please select an option:') {
      return inquirer.prompt([
         {
             type: 'list',
             name: 'selection',
             message: prompt,
             choices: choices,
             pageSize: choices.length // Limit number of choices shown at once
         }
     ]);
   }
}