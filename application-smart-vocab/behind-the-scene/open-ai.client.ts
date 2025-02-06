import OpenAI from "openai";
import { Environments } from '@cbto/nodepackages.utils/constants/environments';
import fs from 'fs';
import path from 'path';
import { Thread } from "openai/resources/beta/threads/threads";

const secrets = {
   openAI_OrganizationId: process.env[Environments.OPENAI_ORGANIZATION_ID] ?? Environments.DEFAULT_FAKE_VALUE,
   openAI_ProjectId: process.env[Environments.OPENAI_PROJECT_ID] ?? Environments.DEFAULT_FAKE_VALUE,
   openAI_Key: process.env[Environments.OPENAI_API_KEY] ?? Environments.DEFAULT_FAKE_VALUE,
   openAI_ModelName: process.env[Environments.OPENAI_MODEL_NAME] ?? Environments.DEFAULT_FAKE_VALUE,
}

const AssistantName = "English Tutor 1.4";
const instructionFileName = "instructions.md";
const SystemPromptFileName = "system-prompt.md";


const newOpenAiClient = () => {
   return new OpenAI({
     organization: secrets.openAI_OrganizationId,
     project: secrets.openAI_ProjectId,
     apiKey: secrets.openAI_Key,
   });
 };
 
 async function getAssistant(openai: OpenAI, assistantName: string) {
   try {
     // Step 1: List all existing assistants
     const assistants = await openai.beta.assistants.list();
 
     // Step 2: Find the assistant by name
     const existingAssistant = assistants.data.find(
       (assistant) => assistant.name === assistantName
     );
 
     // Step 3: Return the existing assistant if found
     if (existingAssistant) {
       //   console.log("Existing assistant found: ", existingAssistant);
       return existingAssistant;
     } else {
       // If no assistant found, return null or handle as needed
       console.log("Assistant not found");
       return null;
     }
   } catch (error) {
     console.error("Error fetching assistants: ", error);
     throw error;
   }
 }
 
 async function createAssistant(openai: OpenAI) {
   // Step 1: Read the instructions from the instructions.md file
   const instructionsFilePath = path.resolve(__dirname, instructionFileName);
   const instructions = fs.readFileSync(instructionsFilePath, "utf-8");
   // Step 1: Create an Assistant with detailed instructions about event types
   let myAssistant;
   try {
     myAssistant = await getAssistant(openai, AssistantName);
   } catch (e) {}
   if (myAssistant) return myAssistant;
   myAssistant = await openai.beta.assistants.create({
     model: secrets.openAI_ModelName,
     instructions: instructions,
     name: AssistantName,
     tools: [{ type: "code_interpreter" }], // You can add more tools if needed
   });
 
   // console.log("Assistant created: ", myAssistant);
   return myAssistant;
 }
 
 async function createReuseThread(openai: OpenAI, threadId?: string) {
   // Step 2: Create or reuse a Thread
   const myThread: Thread = threadId
     ? await openai.beta.threads.retrieve(threadId)
     : await openai.beta.threads.create();
   //   console.log("Thread created or retrieved: ", myThread);
   return myThread;
 }
 
 export class OpenAIService {
   async askEnglishTutorAsync(userPrompt: string, threadId?: string) {
     // Step 1: Read the instructions from the instructions.md file
     const systemPromptFilePath = path.resolve(__dirname, SystemPromptFileName);
     const systemPrompt = fs.readFileSync(systemPromptFilePath, "utf-8");
     const openAiClient = newOpenAiClient();
     const assistant = await createAssistant(openAiClient);
     const thread = await createReuseThread(openAiClient, threadId);

     await openAiClient.beta.threads.messages.create(thread.id, {
         role: "user",
         content:
         userPrompt,
     });
 
     // Step 6: Execute the Assistant's run
     const myRun = await openAiClient.beta.threads.runs.create(thread.id, {
         assistant_id: assistant.id,
         instructions: systemPrompt,
     });
 
     // Step 7: Periodically retrieve the Run to check on its status
     const retrieveRun = async () => {
         let keepRetrievingRun;
 
         while (myRun.status === "queued" || myRun.status === "in_progress") {
             keepRetrievingRun = await openAiClient.beta.threads.runs.retrieve(
                 thread.id,
                 myRun.id
             );
 
             if (keepRetrievingRun.status === "completed") {
                 // Step 8: Retrieve the assistant's response
                 const allMessages = await openAiClient.beta.threads.messages.list(thread.id);
                 return allMessages.data[0].content[0].type === "text"
                     ? allMessages.data[0].content[0].text.value
                     : "Not a Text";
             }
         }
         return "Cycle Broken";
     };
 
     // Step 9: Get and return the assistant's answer
     const response = await retrieveRun();
     return { response, threadId: thread.id };
   }
 }
 