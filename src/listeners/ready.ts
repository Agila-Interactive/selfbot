import type { Client } from "discord.js-selfbot-v13"
import type { Config } from "../types/EventListener"

import { $ } from "bun";

export const config : Config = {
    Name: "ready",
    Once: true,
}

export async function execute(client : Client) : Promise<void> {
    await $`clear`;
    console.log(`Logged in as ${client.user!.username} <@${client.user!.id}>`);
}
