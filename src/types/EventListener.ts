export type Config = {
    Name : string,
    Once : boolean,
}

export type EventListener = {
    config : Config,
    execute : (args : unknown) => Promise<void>;
}
