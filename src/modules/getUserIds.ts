import type { Client, Guild, Message, GuildMember } from "discord.js-selfbot-v13";

export async function getUserIds(message : Message, client : Client) : Promise<void > {
    const guildId : string = message.guildId!;
    const guild : Guild = await client.guilds.fetch(guildId);
    const totalMemberCount = guild.memberCount;
    const members = await guild.members.fetch();
    const fetched = guild.members.cache.size;
    console.log(`Total number of members: ${totalMemberCount}\nNumber of users fetched successfully: ${fetched}\nPercentage: ${(fetched / totalMemberCount) * 100}%`);

}

