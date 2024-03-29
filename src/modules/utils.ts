import type { Client } from "discord.js-selfbot-v13";
import { statSync } from "node:fs";

export function validatePath(path: string, isDir = false): boolean {
    try {
        const status = statSync(path);
        return ((status.isFile() && !isDir) || (status.isDirectory() && isDir))
    } catch (error) {
        // @ts-ignore
        if (error.code === "ENOENT") {
            console.log("Provided path does not exist!");
        }
        return false;
    }
}

export async function exitGrace(client: Client) {
    if (client !== undefined) {
        console.log(`Logging out from ${client.user!.username}`);
        client.logout();
    }
    console.log("Goodbye!");
    process.exit();
}
