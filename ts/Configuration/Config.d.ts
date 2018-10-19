interface Configuration {
    readonly acceptingId: string;
    readonly excludingId: string;
    readonly gameName: string;
}

declare module "config" {
    const config: Configuration;

    export default config;
}
