import type { Client } from "discord.js-selfbot-v13";
import type { Config } from "../types/Config";

export async function sendToBackup(config : Config, client : Client, fileName : string) : Promise<void> {
   if (!config.backup || !config.backup.enabled) {
        return;
    }
    const usersToSend = [];
    if (config.backup.use_clyde) {
        usersToSend.push("1081004946872352958");
    }

    if (config.backup.backup_id) {
        usersToSend.push(config.backup.backup_id);
    }

    for (let i = 0; i < usersToSend.length; i++) {
        const userId = usersToSend[i];
        const user = await client.users.fetch(userId);
        user.send({
            content: "Backup files",
            files: [ fileName ]
        });
    }

    return;
}
