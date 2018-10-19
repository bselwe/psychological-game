import * as React from "react";
import config from "config";

import styles from "./styles.sass";
import { AppButton } from "$components/AppButton";

interface FirstSurveyProps {
    readonly onContinue: () => void;
}

interface FirstSurveyState {
    readonly surveyLoads: number;
    readonly surveySubmitted: boolean;
}

export class FirstSurvey extends React.Component<FirstSurveyProps, FirstSurveyState> {
    constructor(props: FirstSurveyProps) {
        super(props);

        this.state = {
            surveyLoads: 0,
            surveySubmitted: false
        };
    }

    render() {
        return <div className={styles["firstSurvey"]}>
            <div className={styles["name"]}>{config.gameName}</div>
            <div className={styles["desc"]}>Przed rozpoczęciem rozgrywki upewnij się, że <u>wypełniłeś formularz.</u></div>
            <div className={styles["survey"]}>
                <iframe onLoad={this.onSurveyLoad} src="https://docs.google.com/forms/d/e/1FAIpQLSdP3-YGThB7P9K61KvLeG5Il23wiqJNhXuVbkfezmrxYrE-Yg/viewform?embedded=true" width="640" height="1029" frameBorder="0" marginHeight={0} marginWidth={0}>Ładuję...</iframe>
            </div>
            <div className={styles["continue"]}>
                <AppButton
                    title={"Rozpocznij rozgrywkę"}
                    disabled={!this.state.surveySubmitted}
                    onClick={this.props.onContinue} />
            </div>
        </div>;
    }

    private onSurveyLoad = () => {
        this.setState({
            surveyLoads: this.state.surveyLoads + 1,
            surveySubmitted: this.state.surveyLoads >= 1
        });
    }
}
