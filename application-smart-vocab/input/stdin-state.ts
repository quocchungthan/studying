import inquirer from "inquirer";

export abstract class StdInState {
   public agentName: string = '';

   public abstract start(): void;

   protected askForTextInput() {

   }

   protected askForSelection(choices: string[]) {
      return inquirer.prompt([
         {
             type: 'list',
             name: 'selection',
             message: 'Please select an option:',
             choices: choices,
             pageSize: choices.length // Limit number of choices shown at once
         }
     ]);
   }
}