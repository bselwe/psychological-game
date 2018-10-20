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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut mi nec dolor tristique pellentesque. Quisque sed vehicula enim, sit amet scelerisque odio. Donec auctor nunc vel aliquam luctus. Nunc tincidunt mollis lectus, vitae bibendum leo. Phasellus commodo at odio sed feugiat. Nulla sit amet ipsum at dolor egestas imperdiet. Etiam rhoncus turpis ut viverra pellentesque. Nullam eget lacinia augue. Donec cursus malesuada faucibus. Nullam aliquet auctor elit, at dapibus urna pharetra ut. Curabitur tempus sodales luctus. Vestibulum eget ex in quam molestie dignissim in eget mi.
            </div>
            <div className={styles["continue"]}>
                <AppButton
                    title={"Start"}
                    onClick={this.props.onContinue} />
            </div>
        </div>;
    }
}
