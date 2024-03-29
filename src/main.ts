import { Client } from "discord.js-selfbot-v13";

import { loadEventListeners } from "./modules/loadEventListener";
import { initConfig, editConfig } from "./modules/setup";
import { exitGrace } from "./modules/utils";
import { prompt } from "./modules/prompter";
import { join } from "node:path";

let client: Client;

async function botLogin(): Promise<void> {
    let token = await prompt({ question: "Enter your discord token: ", type: "string" }) as string;
    token = token.replaceAll('"', "");
    client = new Client();
    await loadEventListeners(client);
    await client.login(token);
}

async function startSelfbot(): Promise<void> {
    await botLogin();
}


async function showMenu(): Promise<void> {
    const logo = await Bun.file(join(import.meta.dir, "templates", "logo.txt")).text();
    const version = await Bun.file(join(import.meta.dir, "..", "version")).text();
    const desc = await Bun.file(join(import.meta.dir, "templates", "description.txt")).text();
    console.log(`${logo}\nversion${version}\n${desc}`);
}

async function showOptions(): Promise<number | void> {
    const option = await prompt({
        question: "What would you like to do",
        type: "option",
        choices: [
            "Start selfbot",
            "Edit settings",
            "Exit",
        ],
    });
    return option as number;
}

async function start(): Promise<void> {
    await showMenu();
    const option = await showOptions();
    switch (option) {
        case 1:
            return startSelfbot();
        case 2:
            return editConfig();
        case 3:
            return exitGrace(client);
    }
}


process.on("SIGINT", async () => {
    await exitGrace(client);
});

await initConfig();
await start();
