import * as React from "react";
import config from "config";

import styles from "./styles.sass";
import loading from "../../../../images/loading.gif";

interface WaitingForPlayersProps {
    readonly onContinue: () => void;
}

export class WaitingForPlayers extends React.Component<WaitingForPlayersProps> {
    componentDidMount() {
        const time = this.getRandomBetween(5000, 10000); // 5-10s
        setTimeout(this.props.onContinue, time);
    }

    render() {
        return <div className={styles["waitingForPlayers"]}>
            {/* <div className={styles["name"]}>{config.gameName}</div> */}
            <div className={styles["loader"]}>
                <div>Oczekiwanie na graczy</div>
                <img src={loading} />
            </div>
        </div>;
    }

    private getRandomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
