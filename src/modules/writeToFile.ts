import type { Client, Collection, GuildMember } from "discord.js-selfbot-v13";
import type { Config } from "../types/Config";

import { exitGrace } from "./utils";
import { join } from "node:path";

export async function writeToFile(client : Client, config : Config, fileName : string, members : Collection<string, GuildMember>) : Promise<void> {
    if (config.output_dir === undefined) {
        console.log("Output directory not found. Please ensure config.json is setup properly");
        exitGrace(client);
    }
    const configFile = Bun.file(join(config!.output_dir as string, fileName));
    const writer = configFile.writer();
    members.forEach(member => {
        writer.write(`${member.user.id}\n`);
    });
    writer.flush();
    writer.end();
    console.log(`Saved as ${fileName}!`);
}
