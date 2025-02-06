export abstract class StdInState {
   public agentName: string = '';

   public abstract start(): void;

   protected askForTextInput() {

   }

   protected askForSelection() {

   }
}