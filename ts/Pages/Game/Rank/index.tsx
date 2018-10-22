import * as React from "react";
import config from "config";

import styles from "./styles.sass";
import opponentOne from "$images/opponent-one.svg";
import opponentTwo from "$images/opponent-two.svg";
import you from "$images/you.svg";
import { AppButton } from "$components/AppButton";
import { PlayerScores, Player } from "../InGame";
import { joinCls } from "$utils/JoinClasses";

interface RankProps {
    readonly scores: PlayerScores;
    readonly onContinue: () => void;
}

interface RankState {
    readonly loser: Player;
}

export class Rank extends React.Component<RankProps, RankState> {
    constructor(props: RankProps) {
        super(props);

        this.state = {
            loser: this.findLoser()
        };
    }

    render() {
        return <div className={styles["rank"]}>
            <div className={styles["name"]}>{config.gameName}</div>
            <div className={styles["rankTitle"]}>Wyniki</div>
            <div className={styles["scores"]}>
                <div className={styles["playerContainer"]}>
                    <div className={joinCls(
                        styles["opponent"],
                        this.state.loser === Player.First && styles["loser"])}>
                        <div className={styles["playerName"]}>Gracz 1</div>
                        <div className={styles["playerPhoto"]}>
                            <img src={opponentOne} />
                            <div className={styles["score"]}>{this.props.scores.First} pkt</div>
                        </div>
                    </div>
                </div>
                <div className={styles["playerContainer"]}>
                    <div className={joinCls(
                        styles["opponent"],
                        this.state.loser === Player.Second && styles["loser"])}>
                        <div className={styles["playerName"]}>Gracz 2 (Ty)</div>
                        <div className={styles["playerPhoto"]}>
                            <img src={you} />
                            <div className={styles["score"]}>{this.props.scores.Second} pkt</div>
                        </div>
                    </div>
                </div>
                <div className={styles["playerContainer"]}>
                    <div className={joinCls(
                        styles["opponent"],
                        this.state.loser === Player.Third && styles["loser"])}>
                        <div className={styles["playerName"]}>Gracz 3</div>
                        <div className={styles["playerPhoto"]}>
                            <img src={opponentTwo} />
                            <div className={styles["score"]}>{this.props.scores.Third} pkt</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["rankDesc"]}>
                <p>Dziękujemy Ci za udział w grze. Do następnego etapu przechodzą dwie osoby, które udzieliły odpowiedzi na największą liczbę pytań.</p>
            </div>
            <div className={styles["continue"]}>
                <AppButton
                    title={"Przejdź dalej"}
                    onClick={this.props.onContinue} />
            </div>
        </div>;
    }

    private findLoser = (): Player => {
        const players = Object.keys(this.props.scores);
        let loser = players[1];

        for (let i = 0; i < players.length; i++) {
            if (this.props.scores[players[i] as keyof typeof Player] <
                this.props.scores[loser as keyof typeof Player]) {
                loser = players[i];
            }
        }

        return Player[loser as keyof typeof Player];
    }
}
