import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import config from "config";

import styles from "./styles.sass";
import { Start } from "./Start";
import { FirstSurvey } from "./FirstSurvey";

enum GameStage {
    Start,
    FirstSurvey,
    Tutorial
}

enum GameScenario {
    Accepting,
    Excluding
}

interface GameState {
    readonly stage: GameStage;
    readonly scenario: GameScenario;
}

class Game extends React.Component<RouteComponentProps, GameState> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            stage: GameStage.Start, // TODO: Change to start
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
                return <Start onContinue={() => this.setState({ stage: GameStage.FirstSurvey })} />;
            case GameStage.FirstSurvey:
                return <FirstSurvey onContinue={() => this.setState({ stage: GameStage.Tutorial })} />;
        }
    }
}

export default withRouter(Game);
