import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import config from "config";

import styles from "./styles.sass";
import { Start } from "./Start";
import { INTESurvey } from "./INTESurvey";
import { Tutorial } from "./Tutorial";
import { WaitingForPlayers } from "./WaitingForPlayers";
import { InGame, PlayerScores } from "./InGame";
import { Rank } from "./Rank";
import { FinishSurvey } from "./FinishSurvey";
import { Explanation } from "./Explanation";

enum GameStage {
    Start,
    INTESurvey,
    Tutorial,
    WaitingForPlayers,
    InGame,
    Rank,
    FinishSurvey,
    Explanation
}

export enum GameScenario {
    Accepting,
    Excluding
}

interface GameState {
    readonly stage: GameStage;
    readonly scenario: GameScenario;
    readonly scores?: PlayerScores;
}

class Game extends React.Component<RouteComponentProps, GameState> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            stage: GameStage.Start,
            scenario: this.resolveGameScenario()
        };
    }

    render() {
        return <div className={styles["game"]}>
            {this.getPage()}
        </div>;
    }

    private resolveGameScenario = () => {
        return this.props.location.pathname.slice(1) === config.acceptingId ?
            GameScenario.Accepting : GameScenario.Excluding;
    }

    private getPage = () => {
        switch (this.state.stage) {
            case GameStage.Start:
                return <Start onContinue={() => this.setState({ stage: GameStage.INTESurvey })} />;
            case GameStage.INTESurvey:
                return <INTESurvey onContinue={() => this.setState({ stage: GameStage.Tutorial })} />;
            case GameStage.Tutorial:
                return <Tutorial onContinue={() => this.setState({ stage: GameStage.WaitingForPlayers })} />;
            case GameStage.WaitingForPlayers:
                return <WaitingForPlayers onContinue={() => this.setState({ stage: GameStage.InGame })} />;
            case GameStage.InGame:
                return <InGame scenario={this.state.scenario} onContinue={scores => this.setState({ stage: GameStage.Rank, scores })} />;
            case GameStage.Rank:
                return <Rank scores={this.state.scores as PlayerScores} onContinue={() => this.setState({ stage: GameStage.FinishSurvey })} />;
            case GameStage.FinishSurvey:
                return <FinishSurvey onContinue={() => this.setState({ stage: GameStage.Explanation })} />;
            case GameStage.Explanation:
                return <Explanation />;
        }
    }
}

export default withRouter(Game);
