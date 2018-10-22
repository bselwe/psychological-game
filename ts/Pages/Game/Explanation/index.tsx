import * as React from "react";
import config from "config";

import styles from "./styles.sass";

export class Explanation extends React.Component {
    render() {
        return <div className={styles["explanation"]}>
            <div className={styles["name"]}>{config.gameName}</div>
            <div className={styles["explanationDesc"]}>
                <p>Dziękujemy Ci bardzo za wzięcie udziału w naszym badaniu.</p>
                <p>W rzeczywistości sprawdzaliśmy jak różne cechy wpływają na zachowania agresywne w momencie wykluczenia społecznego. Twoimi kolegami z zespołu był program komputerowy, a cała rozgrywka była z góry ustalona wedle konkretnego algorytmu.</p>
                <p>Mamy nadzieję, że nie poczułeś urażony. Dzięki Tobie mamy możliwość badać mechanizmy ludzkiego zachowania i wzbogacać świat nauki o nową wiedzę.</p>
                <p>Gdybyś chciał się z nami skontaktować, napisz pod adres mailowy: <a href="mailto:badanie.wykluczenie@gmail.com">badanie.wykluczenie@gmail.com</a></p>
            </div>
        </div>;
    }
}
