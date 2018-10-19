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
            <div className={styles["desc"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut mi nec dolor tristique pellentesque. Quisque sed vehicula enim, sit amet scelerisque odio. Donec auctor nunc vel aliquam luctus. Nunc tincidunt mollis lectus, vitae bibendum leo. Phasellus commodo at odio sed feugiat. Nulla sit amet ipsum at dolor egestas imperdiet. Etiam rhoncus turpis ut viverra pellentesque. Nullam eget lacinia augue. Donec cursus malesuada faucibus. Nullam aliquet auctor elit, at dapibus urna pharetra ut. Curabitur tempus sodales luctus. Vestibulum eget ex in quam molestie dignissim in eget mi.</div>
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
