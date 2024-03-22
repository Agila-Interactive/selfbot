import { Client } from "discord.js-selfbot-v13";

import { loadEventListeners } from "./modules/loadEventListener";
import { prompt } from "./modules/prompter"
import type { Config } from "./types/Config";
import { initConfig } from "./modules/setup";
import { join} from "node:path";


let client : Client;

async function botLogin() : Promise<Client> {
    const token = await prompt({ question: "Enter your discord token: ", type: "string" });
    client = new Client();
    await loadEventListeners(client);

}

async function showMenu() : Promise<void> {
    const logo = await Bun.file(join(import.meta.dir, "templates", "logo.txt")).text();
    const version = await Bun.file(join(import.meta.dir, "..", "version")).text();
    const desc = await Bun.file(join(import.meta.dir, "templates", "description.txt")).text();
    console.log(`${logo}\nversion${version}\n${desc}`);
}

async function showOptions() : Promise<number | void> {
    const option = await prompt({
        question: "What would you like to do",
        type: "option",
        choices: [
            "Login",
            "Edit settings",
            "Exit",
        ],
    });
    if (option === 3) {
        console.log("Goodbye!")
        process.exit(0);
    }
}

async function start() {
    await showMenu();
    const option = await showOptions();
}

async function exitGrace() {
    if (client !== undefined) {
        client.logout();
    }
}

process.on("SIGINT", async () => {
    await exitGrace();
    process.exit();
})

await initConfig();
await start();
