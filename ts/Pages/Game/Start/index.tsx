import * as React from "react";
import config from "config";

import styles from "./styles.sass";
import { AppButton } from "$components/AppButton";

interface StartProps {
    readonly onContinue: () => void;
}

interface StartState {
    readonly termsAccepted: boolean;
}

export class Start extends React.Component<StartProps, StartState> {
    constructor(props: StartProps) {
        super(props);

        this.state = {
            termsAccepted: false
        };
    }

    render() {
        return <div className={styles["start"]}>
            <div className={styles["name"]}>{config.gameName}</div>
            <div className={styles["desc"]}>
                <p>Dziękujemy za zainteresowanie naszym badaniem. Jesteśmy studentami V roku psychologii. W ramach badań do pracy magisterskiej przeprowadzamy badanie dotyczące różnić indywidualnych i ich uwarunkowań.  Twoim zadaniem będzie wypełnienie trzech kwestionariuszy, a następnie wzięcie udziału w rozgrywce. Całość zajmie około 15 – 25 minut.</p>
                <p>Udział w badaniu jest dobrowolny i na każdym etapie można się z niego wycofać, bez ponoszenia jakichkolwiek konsekwencji. Zebrane przez nas dane mają charakter anonimowy. Wyniki zbiorcze będą wykorzystane jedynie w celach naukowych.</p>
                <p>Czy wyrażasz zgodę na przystąpienie do badania?</p>
            </div>
            <div className={styles["terms"]}>
                <input
                    id="terms"
                    type="checkbox"
                    checked={this.state.termsAccepted}
                    onChange={e => this.setState({ termsAccepted: e.target.checked })} />
                <label htmlFor="terms">Wyrażam zgodę na badanie</label>
            </div>
            <div className={styles["continue"]}>
                <AppButton
                    title={"Rozpocznij grę"}
                    disabled={!this.state.termsAccepted}
                    onClick={this.props.onContinue} />
            </div>
        </div>;
    }
}
