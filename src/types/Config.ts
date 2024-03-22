export type Backup = {
    enabled : boolean | undefined,
    use_clyde : boolean,
    backup_id : string,
}

export type Command = {
    command_type : "legacy" | "slash",
    legacy_command_prefix : string | undefined,
    command_name : string,
}

export type Packwatch = {
    enabled : boolean | undefined,
    guild_id : string | undefined,
    channel_id : string | undefined,
    command : Command | undefined
}

export type Config = {
    backup : Backup | undefined,
    packwatch : Packwatch | undefined,
    output_dir : string | undefined,
}
