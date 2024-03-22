import { Client } from "discord.js-selfbot-v13";


import { loadEventListeners } from "./modules/loadEventListener";
import { prompt } from "./modules/prompter"
import type { Config } from "./types/Config";
import { initConfig } from "./modules/setup";
import { join} from "node:path";

async function botLogin() : Promise<Client> {
    const token = await prompt({ question: "Enter your discord token: ", type: "string" });
    const client = new Client();
    await loadEventListeners(client);

}

async function showMenu() : Promise<void> {
    const logo = Bun.file(join(import.meta.dir, "templates", "logo.txt"));
    console.log(await logo.text())
}

async function start() {
    showMenu();
}

await initConfig();
await start();
