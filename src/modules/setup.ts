import { getSavedConfig, writeToConfig } from "./configHandler";
import type { Backup, Command, Config, Packwatch } from "../types/Config";
import { resolve, join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { validatePath } from "./utils";
import { prompt } from "./prompter";

async function getOutDir() : Promise<string> {
    // @ts-ignore
    const useDefault = await prompt({
        question: "Do you wish to use default output directory",
        type: "boolean",
        default: true,
    });

    if (useDefault) {
        const outdir = resolve(join(import.meta.dir, "../..", "output"));
        if (!existsSync(outdir)) {
            mkdirSync(outdir);
        }
        return outdir;
    }

    // @ts-ignore
    const outdir : string = await prompt({
        question: "Output directory (Must be absolute path)",
        type: "string"
    });
    if (!validatePath(outdir)) {
        return getOutDir();
    }
    return outdir;
}

async function getBackup() : Promise<Backup | undefined> {
    const enabled = await prompt({
        question: "Do you wish to enable backup",
        type: "boolean",
        default: true,
    });
    if (!enabled) {
        return undefined;
    }

    const use_clyde = await prompt({
        question: "Do you wish to backup files to clyde's DMs?",
        type: "boolean",
        default: false,
    });
    // @ts-ignore
    const backup_id = await prompt({
        question: "Please enter the user ID / channel ID you wish to send backup files to",
        type: "string"
    });
    return { enabled, use_clyde, backup_id } as Backup;
}

async function getPackwatchCommand() : Promise<Command | undefined> {
    let cmdType  = await prompt({
        question: "Which command type does Packwatch use",
        type: "option",
        choices: [
            "legacy (prefix + command)",
            "slash command",
        ]
    });
    let command_type : "legacy" | "slash";
    let legacy_command_prefix : string | undefined;
    let packwatch_id : string | undefined;
    if (cmdType === 1) {
        command_type = "legacy";
        // @ts-ignore
        legacy_command_prefix = await prompt({
            question: "Please enter the command prefix",
            type: "string",
        });

    } else {
        command_type = "slash";
        // @ts-ignore
        packwatch_id  = await prompt({
            question: "Please enter packwatch id",
            type: "string",
        });
    }
    let command_name = await prompt({
        question: "What is the command name",
        type: "string",
    });

    return { command_type, legacy_command_prefix, command_name, packwatch_id } as Command;
}

async function getPackwatch() : Promise<Packwatch | undefined> {
    const enabled = await prompt({
        question: "Do you wish to enable auto packwatch ban?",
        type: "boolean",
        default: false,
    });
    if (!enabled) {
        return undefined;
    }
    const guild_option = await prompt({
        question: "Which server do you wish to use packwatch in?",
        type: "option",
        choices: [
            "ACS Community Server (827005719454810173)",
            "ACS Management Server (1124361870921441320)"
        ]
    });
    let guild_id : string;
    if (guild_option === 1) {
        guild_id = "827005719454810173";
    } else {
        guild_id = "1124361870921441320";
    }

    const channel_id = await prompt({
        question: "Please enter the channel id (Must be a channel from the previous selectlyed server)",
        type: "string",
    });

    const command = await getPackwatchCommand();

    return { enabled, guild_id, channel_id, command } as Packwatch
}

async function promptConfig() : Promise<Config>{
    const output_dir = await getOutDir();
    const backup = await getBackup();
    const packwatch = await getPackwatch();

    return { output_dir, backup, packwatch } as Config;
}

export async function initConfig() : Promise<Config>{
    const savedConfig : Config | null = await getSavedConfig();
    if (savedConfig === null) {
        const config : Config = await promptConfig();
        await writeToConfig(config);
        return config;
    }
    return savedConfig;
}

export async function editConfig() : Promise<void> {
}
