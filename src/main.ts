import { Client } from "discord.js-selfbot-v13";

import { loadEventListeners } from "./modules/loadEventListener";
import { prompt } from "./modules/prompter"
import type { Config } from "./types/Config";

async function setup() : Promise<Config> {

}



async function botLogin() : Promise<Client> {


    const token = await prompt({ question: "Enter your discord token: ", type: "string" });
    const client = new Client();
    await loadEventListeners(client);

}

botLogin();
