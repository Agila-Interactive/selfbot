import type { Client } from "discord.js-selfbot-v13";

import type { EventListener } from "./../types/EventListener"
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const eventListenerDir = join(import.meta.dirname, "..", "listeners");

async function getEventListeners() : Promise<string[]> {
    const files = await readdir(eventListenerDir, { recursive: true });
    return files.filter(file => file.endsWith(".ts"));
}

export async function loadEventListeners(client : Client) : Promise<void> {
    const eventListeners = await getEventListeners();
    for (let i = 0; i < eventListeners.length; i++) {
        const eventListener : EventListener = require(join(eventListenerDir, eventListeners[i]));
        if (eventListener.config.Once) {
            // @ts-ignore
            client.once(eventListener.config.Name, (...args) => eventListener.execute(...args, client));
            continue;

        }
        // @ts-ignore
        client.on(eventListener.config.Name, (...args) => eventListener.execute(...args, client));
    }
}

