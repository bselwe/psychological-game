import * as React from "react";
import config from "config";

import styles from "./styles.sass";
import { AppButton } from "$components/AppButton";

interface INTESurveyProps {
    readonly onContinue: () => void;
}

interface INTESurveyState {
    readonly surveyLoads: number;
    readonly surveySubmitted: boolean;
}

export class INTESurvey extends React.Component<INTESurveyProps, INTESurveyState> {
    private survey: HTMLIFrameElement | null = null;

    constructor(props: INTESurveyProps) {
        super(props);

        this.state = {
            surveyLoads: 0,
            surveySubmitted: false
        };
    }

    render() {
        return <div className={styles["inteSurvey"]}>
            <div className={styles["name"]}>{config.gameName}</div>
            <div className={styles["desc"]}>Przed rozpoczęciem rozgrywki upewnij się, że <u>wypełniłeś/aś formularz.</u></div>
            <div className={styles["survey"]}>
                <iframe
                    id={"google-survey"}
                    ref={s => this.survey = s}
                    onLoad={this.onSurveyLoad} src="https://docs.google.com/forms/d/e/1FAIpQLSfTpgi6FoATvYXIBEFscj4WTxblfQRpZOb8JEpTENnPrJaJiA/viewform?embedded=true"
                    width="640"
                    height="500"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}>
                    Ładuję...
                </iframe>
            </div>
            <div className={styles["continue"]}>
                <AppButton
                    title={"Rozpocznij rozgrywkę"}
                    disabled={!this.state.surveySubmitted}
                    onClick={this.continue} />
            </div>
        </div>;
    }

    private onSurveyLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
        this.setState({
            surveyLoads: this.state.surveyLoads + 1,
            surveySubmitted: this.state.surveyLoads >= 2
        });
    }

    private continue = () => {
        if (confirm("Czy na pewno wypełniłeś i wysłałeś/aś formularz?")) {
            this.props.onContinue();
        }
    }
}
