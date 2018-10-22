interface Configuration {
    readonly acceptingId: string;
    readonly excludingId: string;
    readonly gameName: string;
    readonly isDebug: boolean;
    readonly minWaitingForPlayersTimeSeconds: number;
    readonly maxWaitingForPlayersTimeSeconds: number;
    readonly numberOfQuestionsInFirstRound: number;
    readonly timeBeforeStartingGameSeconds: number;
    readonly playerAutomaticChoosingTimeSeconds: number;
    readonly maxAnswerTimeSeconds: number;
    readonly maxPlayerChooseTimeSeconds: number;
    readonly minOpponentAnswerTimeSeconds: number;
    readonly maxOpponentAnswerTimeSeconds: number;
    readonly minOpponentPlayerChooseTimeSeconds: number;
    readonly maxOpponentPlayerChooseTimeSeconds: number;
    readonly timeBeforeShowingAnswerSeconds: number;
    readonly timeBeforeMovingToNextQuestionSeconds: number;
}

declare module "config" {
    const config: Configuration;

    export default config;
}
