import type { Client, Guild, Message } from "discord.js-selfbot-v13";

import { sendToPackwatch } from "./sendToPackwatch";
import { getSavedConfig } from "./configHandler";
import { writeToFile } from "./writeToFile";
import { sendToBackup } from "./sendBackup";
import { exitGrace } from "./utils";

export async function getUserIds(message: Message, client: Client): Promise<void> {
    const guildId: string = message.guildId!;
    const guild: Guild = await client.guilds.fetch(guildId);
    const totalMemberCount = guild.memberCount;
    let members = await guild.members.fetch();
    const fetched = guild.members.cache.size;
    console.log(`Total number of members: ${totalMemberCount}\nNumber of users fetched successfully: ${fetched}\nPercentage: ${(fetched / totalMemberCount) * 100}%`);
    members = members.filter(member => !member.user.bot && member.id !== client.user!.id);
    const config = await getSavedConfig();
    if (config === null) {
        console.log("Failed to read config. Aborting...");
        exitGrace(client);
    }
    const timestamp = Date.now();
    const fileName = `${timestamp}_${guildId}.txt`;
    await writeToFile(client, config!, fileName, members);
    await sendToBackup(config!, client, fileName);
    await sendToPackwatch(config!, client, fileName);
    return;
}
