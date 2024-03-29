import type { Client } from "discord.js-selfbot-v13";
import type { Config } from "../types/Config";

import { MessageAttachment } from "discord.js-selfbot-v13";
import { readFileSync } from "node:fs";

export async function sendToPackwatch(config : Config, client : Client, fileName : string) : Promise<void> {
    if (!config.packwatch || !config.packwatch.enabled) {
        return;
    }

    const guildId = config.packwatch.guild_id!;
    const channelId = config.packwatch.channel_id!;
    const guild = await client.guilds.fetch(guildId);
    if (guild === undefined || guild == null) {
        console.log(`Guild with id ${guildId} not found!`);
        return;
    }

    const channel = await guild.channels.fetch(channelId);
    if (channel === undefined || channel === null) {
        return;
    }

    if (channel.type !== "GUILD_TEXT") {
        return;
    }

    if (config.packwatch.command!.command_type === "slash") {
        if (config.packwatch.command!.packwatch_id === undefined) {
            return;
        }
        channel.sendSlash(config.packwatch.command!.packwatch_id, config.packwatch.command!.command_name, new MessageAttachment(readFileSync(fileName), fileName));
        return;
    }

        if (config.packwatch.command!.command_name === undefined || config.packwatch.command!.legacy_command_prefix === undefined) {
        return;
    }
        if (config.packwatch.command!.command_name === undefined || config.packwatch.command!.legacy_command_prefix === undefined) {
        return;
    }

    channel.send({
        content: `${config.packwatch.command!.legacy_command_prefix}${config.packwatch.command!.command_name}`,
        files: [ fileName ]
    });

}
