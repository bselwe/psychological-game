import * as React from "react";
import config from "config";

import { joinCls } from "$utils/JoinClasses";
import { getTimeBetweenMs } from "$utils/Time";
import acceptingAlgorithm from "$algorithms/accepting.json";

import styles from "./styles.sass";
import opponentOne from "$images/opponent-one.svg";
import opponentTwo from "$images/opponent-two.svg";
import you from "$images/you.svg";
import { GameScenario } from "$pages/Game";
import { AppButton } from "$components/AppButton";

enum Player {
    First = 1,
    Second = 2, // You
    Third = 3
}

type OnNewPlayerCallback = (newPlayer: Player) => void;

interface AlgorithmStep {
    readonly question: string;
    readonly answers: string[];
    readonly acceptedAnswer: number;
    readonly opponentResponse: number | null;
    readonly isPlayerResponder: boolean;
}

interface InGameProps {
    readonly scenario: GameScenario;
    readonly onContinue: () => void;
}

interface InGameState {
    readonly selectedPlayer: Player;
    readonly selectedAnswer: number | null;
    readonly acceptedAnswer: number | null;
    readonly scores: { -readonly [P in keyof typeof Player]: number; };
    readonly lastOpponent: Player;
    readonly algorithm: AlgorithmStep[];
    readonly currentStep: number;
    readonly secondsPassed: number;
    readonly secondsLeft: number;
    readonly isChoosingOpponent: boolean;
    readonly lastQuestionAnsweredCorrectly: boolean;
    readonly gameEnd: boolean;
}

export class InGame extends React.Component<InGameProps, InGameState> {
    private timer: NodeJS.Timer | null = null;
    private onNewPlayerCallback: OnNewPlayerCallback | null = null;

    constructor(props: InGameProps) {
        super(props);

        this.state = {
            selectedPlayer: Player.First,
            selectedAnswer: null,
            acceptedAnswer: null,
            scores: { "First": 0, "Second": 0, "Third": 0 },
            lastOpponent: Player.First,
            algorithm: props.scenario === GameScenario.Accepting ? acceptingAlgorithm : acceptingAlgorithm, // TODO: Change
            currentStep: 0,
            secondsPassed: 0,
            secondsLeft: config.maxAnswerTimeSeconds,
            isChoosingOpponent: false,
            lastQuestionAnsweredCorrectly: false,
            gameEnd: false
        };
    }

    componentDidMount() {
        this.beginQuestion();
    }

    render() {
        const step = this.state.algorithm[this.state.currentStep];
        const isPlayerChoosingOpponent = this.state.isChoosingOpponent && this.isPlayerPlaying();

        return <div className={styles["inGame"]}>
            <div className={styles["nameAndOpponents"]}>
                <div className={styles["name"]}>{config.gameName}</div>
                <div className={styles["opponents"]}>
                    <div className={joinCls(
                        styles["opponent"],
                        this.state.selectedPlayer === Player.First && styles["selected"],
                        isPlayerChoosingOpponent && styles["availableToChoose"])}>
                        <div className={styles["playerName"]}>Gracz 1</div>
                        <div className={styles["playerPhoto"]}>
                            <img
                                src={opponentOne}
                                onClick={isPlayerChoosingOpponent ? () => this.choosePlayer(Player.First) : undefined} />
                            <div className={styles["score"]}>{this.state.scores.First} pkt</div>
                        </div>
                    </div>
                    <div className={joinCls(
                        styles["opponent"],
                        this.state.selectedPlayer === Player.Third && styles["selected"],
                        isPlayerChoosingOpponent && styles["availableToChoose"])}>
                        <div className={styles["playerName"]}>Gracz 3</div>
                        <div className={styles["playerPhoto"]}>
                            <img
                                src={opponentTwo}
                                onClick={isPlayerChoosingOpponent ? () => this.choosePlayer(Player.Third) : undefined} />
                            <div className={styles["score"]}>{this.state.scores.Third} pkt</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["questionAndAnswers"]}>
                {!this.state.gameEnd ?
                <>
                    <div className={styles["question"]}>
                        {step.question}
                    </div>
                    <div className={styles["answers"]}>
                        <div className={styles["twoAnswers"]}>
                            {this.renderAnswer(0)}
                            {this.renderAnswer(1)}
                        </div>
                        <div className={styles["twoAnswers"]}>
                            {this.renderAnswer(2)}
                            {this.renderAnswer(3)}
                        </div>
                    </div>
                </> :
                <>
                    <div className={styles["gameEnd"]}>Koniec gry</div>
                    <AppButton
                        title={"Przejdź dalej"}
                        className={styles["continue"]}
                        onClick={this.props.onContinue} />
                </>}
            </div>
            <div className={styles["feedbackAndYou"]}>
                <div className={styles["feedback"]}>
                    {!this.state.gameEnd &&
                    <>
                        {this.state.isChoosingOpponent ?
                        <div className={styles["playerChoose"]}>
                            {this.isPlayerPlaying() ?
                            <span><b>Wybierz kolejnego gracza klikając na jego avatar.</b></span> :
                            <span>Gracz {this.state.selectedPlayer} wybiera kolejnego gracza.</span>}
                        </div> :
                        <div className={styles["responder"]}>
                            {this.isPlayerPlaying() ?
                            <span><b>Odpowiadasz!</b></span> :
                            <span>Odpowiada Gracz {this.state.selectedPlayer}.</span>}
                        </div>}
                        <div className={styles["timeRemaining"]}>Pozostały czas: <b>{this.state.secondsLeft} s</b></div>
                    </>}
                </div>
                <div className={joinCls(styles["you"], this.isPlayerPlaying() && styles["selected"])}>
                    <div className={styles["playerName"]}>Gracz 2 (Ty)</div>
                    <div className={styles["playerPhoto"]}>
                        <img src={you} />
                        <div className={styles["score"]}>{this.state.scores.Second} pkt</div>
                    </div>
                </div>
            </div>
        </div>;
    }

    private renderAnswer = (answer: number) => {
        const step = this.state.algorithm[this.state.currentStep];
        const isPlayerResponder = step.isPlayerResponder;
        const acceptedAnswer = this.state.acceptedAnswer;
        const selectedAnswer = this.state.selectedAnswer;

        return <div
            onClick={() => isPlayerResponder && !this.state.selectedAnswer && this.selectAnswer(answer)}
            className={joinCls(
                selectedAnswer === answer && acceptedAnswer === null && styles["selected"],
                acceptedAnswer === answer && selectedAnswer === answer && styles["accepted"],
                acceptedAnswer !== null && acceptedAnswer !== answer && selectedAnswer === answer && styles["rejected"]
            )}>
            <b>{String.fromCharCode(97 + answer)}.</b> {step.answers[answer]}
        </div>;
    }

    private beginQuestion = () => {
        this.initializeTimer(() => {
            this.setState({
                lastQuestionAnsweredCorrectly: false
            }, this.moveToNextQuestion);
        });
        this.tryPlayOpponent();
    }

    private moveToNextQuestion = () => {
        const lastOpponent = !this.isPlayerPlaying() ?
            this.state.selectedPlayer : this.state.lastOpponent;

        const currentStep = this.state.currentStep < this.state.algorithm.length - 1 ?
            this.state.currentStep + 1 : this.state.currentStep;

        const isPlayerResponder = this.state.algorithm[currentStep].isPlayerResponder;

        const defaultNextPlayer = isPlayerResponder ? Player.Second :
            (lastOpponent === Player.First ? Player.Third : Player.First);

        const gameEnd = this.state.currentStep === currentStep;

        if (gameEnd) {
            this.endGame();
        } else {
            this.waitForNewPlayer(defaultNextPlayer, selectedPlayer => {
                this.onNewPlayerCallback = null;
                this.setState({
                    selectedPlayer,
                    selectedAnswer: null,
                    acceptedAnswer: null,
                    lastOpponent,
                    currentStep,
                    secondsPassed: 0,
                    secondsLeft: config.maxAnswerTimeSeconds,
                    isChoosingOpponent: false
                }, this.beginQuestion);
            });
        }
    }

    private waitForNewPlayer = (defaultNextPlayer: Player, onSuccess: (selectedPlayer: Player) => void) => {
        this.onNewPlayerCallback = onSuccess;

        if (!this.state.lastQuestionAnsweredCorrectly) {
            this.onNewPlayerCallback(defaultNextPlayer);
            return;
        }

        this.setState({
            secondsPassed: 0,
            secondsLeft: config.maxPlayerChooseTimeSeconds,
            isChoosingOpponent: true
        }, () => {
            this.initializeTimer(() => (this.onNewPlayerCallback as OnNewPlayerCallback)(defaultNextPlayer));
            this.tryChoosePlayerOpponent(defaultNextPlayer);
        });
    }

    private tryChoosePlayerOpponent = (defaultNextPlayer: Player) => {
        if (!this.isPlayerPlaying()) {
            const timeToRespond = getTimeBetweenMs(config.minOpponentPlayerChooseTimeSeconds, config.maxOpponentPlayerChooseTimeSeconds);

            if (config.isDebug) {
                console.warn("Opponent choosing player in " + timeToRespond + " ms, selected player: " + defaultNextPlayer);
            }

            setTimeout(() => this.choosePlayer(defaultNextPlayer), timeToRespond);
        }
    }

    private choosePlayer = (nextPlayer: Player) => {
        if (!this.onNewPlayerCallback) {
            return;
        }

        this.clearTimer();
        this.onNewPlayerCallback(nextPlayer);
    }

    private tryPlayOpponent = () => {
        if (!this.isPlayerPlaying()) {
            const timeToRespond = getTimeBetweenMs(config.minOpponentAnswerTimeSeconds, config.maxOpponentAnswerTimeSeconds);
            const answerSelected = this.state.algorithm[this.state.currentStep].opponentResponse;

            if (config.isDebug) {
                console.warn("Opponent " + this.state.selectedPlayer + " answering in " + timeToRespond + " ms, selected answer: " + answerSelected);
            }

            if (answerSelected !== null) {
                setTimeout(() => this.selectAnswer(answerSelected), timeToRespond);
            }
        }
    }

    private selectAnswer = (answer: number) => {
        this.clearTimer();

        this.setState({ selectedAnswer: answer }, () => {
            const acceptedAnswer = this.state.algorithm[this.state.currentStep].acceptedAnswer;
            const lastQuestionAnsweredCorrectly = answer === acceptedAnswer;

            setTimeout(() => {
                if (lastQuestionAnsweredCorrectly) {
                    this.addPointForCurrentPlayer();
                }

                this.setState({ acceptedAnswer, lastQuestionAnsweredCorrectly }, () => setTimeout(() => {
                    this.moveToNextQuestion();
                }, config.timeBeforeMovingToNextQuestionSeconds * 1000));
            }, acceptedAnswer !== null ? config.timeBeforeShowingAnswerSeconds * 1000 : 0);
        });
    }

    private addPointForCurrentPlayer = () => {
        const scores = this.state.scores;
        const player = Player[this.state.selectedPlayer] as keyof typeof Player;

        scores[player]++;

        this.setState({ scores });
    }

    private isPlayerPlaying = () => {
        return this.state.selectedPlayer === Player.Second;
    }

    private endGame = () => {
        this.clearTimer();
        this.setState({ gameEnd: true });
    }

    private waitForResponse = (onSuccess: () => void) => {
        if (this.state.secondsLeft > 0) {
            this.setState({
                secondsLeft: this.state.secondsLeft - 1,
                secondsPassed: this.state.secondsPassed + 1
            });
            this.timer = setTimeout(() => this.waitForResponse(onSuccess), 1000);
        } else {
            onSuccess();
        }
    }

    private initializeTimer = (onFinished: () => void) => {
        this.timer = setTimeout(() => this.waitForResponse(onFinished), 1000);
    }

    private clearTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
}
