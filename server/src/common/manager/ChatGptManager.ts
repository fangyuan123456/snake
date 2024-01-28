import OpenAI from "openai";
import { SingleBase } from "../base/SingleBase";
export class ChatGptManager extends SingleBase{
    openAi:OpenAI
    constructor(){
        super();
        this.openAi = new OpenAI();
    }
    async test(){
        const completion = await this.openAi.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0]);
    }
}