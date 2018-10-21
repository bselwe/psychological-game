import * as React from "react";
import config from "config";

import { getTimeBetweenMs } from "$utils/Time";

import styles from "./styles.sass";
import loading from "$images/loading.gif";

interface WaitingForPlayersProps {
    readonly onContinue: () => void;
}

export class WaitingForPlayers extends React.Component<WaitingForPlayersProps> {
    componentDidMount() {
        const time = getTimeBetweenMs(config.minWaitingForPlayersTimeSeconds, config.maxWaitingForPlayersTimeSeconds);
        setTimeout(this.props.onContinue, time);
    }

    render() {
        return <div className={styles["waitingForPlayers"]}>
            <div className={styles["loader"]}>
                <div>Oczekiwanie na graczy</div>
                <img src={loading} />
            </div>
        </div>;
    }
}
