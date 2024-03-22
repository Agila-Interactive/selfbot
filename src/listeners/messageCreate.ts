import type { Message, Client } from "discord.js-selfbot-v13";
import type { Config } from "./../types/EventListener";

import { getUserIds } from "./../modules/getUserIds";

export const config : Config = {
    Name: "messageCreate",
    Once: false,
}

export async function execute(message : Message, client : Client) : Promise<void> {
    if (message.author.id !== client.user!.id) {
        return;
    }
    if (message.guild === null) {
        return;
    }
    return getUserIds(message, client);
}
