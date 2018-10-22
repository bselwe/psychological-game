import * as React from "react";
import config from "config";

import styles from "./styles.sass";
import { AppButton } from "$components/AppButton";

interface TutorialProps {
    readonly onContinue: () => void;
}

export class Tutorial extends React.Component<TutorialProps> {
    render() {
        return <div className={styles["tutorial"]}>
            <div className={styles["name"]}>{config.gameName}</div>
            <div className={styles["rulesTitle"]}>Zasady gry</div>
            <div className={styles["rulesDesc"]}>
                <p>Za chwilę rozpocznie się gra, w której razem z dwójką innych osób połączonych online będziecie tworzyć zespół.</p>
                <p>Waszym zadaniem jest udzielenie jak największej liczby poprawnych odpowiedzi. Rozgrywka jest podzielona na etapy, zatem od tej rundy zależy Wasz dalszy udział w grze.</p>
                <p>W rundzie pierwszej każdy z graczy kolejno udziela odpowiedzi. W dalszej części gry uczestnicy po udzieleniu prawidłowej odpowiedzi wyznaczają osobę do następnego pytania.</p>
                <p>W przypadku udzielenia błędnej odpowiedzi, nowe pytanie przechodzi do osoby, która odpowiadała jako ostatnia.</p>
            </div>
            <div className={styles["continue"]}>
                <AppButton
                    title={"Start"}
                    onClick={this.props.onContinue} />
            </div>
        </div>;
    }
}
