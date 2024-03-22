import { existsSync } from "node:fs";

import type { Config } from "./../types/Config";

export async function getSavedConfig(): Promise<Config | null> {
    if (!existsSync("./config.json")) {
        return null;
    }
    const configFile = Bun.file("./config.json");
    return await configFile.json() as Config;
}

export async function writeToConfig(newConfig: Config): Promise<void> {
    console.log("Saving config...");
    const configFile = Bun.file("./config.json");
    const writer = configFile.writer();
    writer.write(JSON.stringify(newConfig));
    writer.flush();
    writer.end();
    console.log("Config saved!");
}
