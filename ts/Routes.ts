import config from "config";

export const GamePage = `/(${config.acceptingId}|${config.excludingId})`;
