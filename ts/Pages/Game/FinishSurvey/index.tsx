import * as React from "react";
import config from "config";

import styles from "./styles.sass";
import { AppButton } from "$components/AppButton";

interface FinishSurveyProps {
    readonly onContinue: () => void;
}

interface FinishSurveyState {
    readonly surveyLoads: number;
    readonly surveySubmitted: boolean;
}

export class FinishSurvey extends React.Component<FinishSurveyProps, FinishSurveyState> {
    constructor(props: FinishSurveyProps) {
        super(props);

        this.state = {
            surveyLoads: 0,
            surveySubmitted: false
        };
    }

    render() {
        return <div className={styles["finishSurvey"]}>
            <div className={styles["name"]}>{config.gameName}</div>
            <div className={styles["survey"]}>
                <iframe
                    id={"google-survey"}
                    onLoad={this.onSurveyLoad} src="https://docs.google.com/forms/d/e/1FAIpQLSdKMh5SbgRTTDrIGR_ZBMknFZSDle7PmmVLeZRY8tsJdtzOHg/viewform?embedded=true&fbclid=IwAR1VE52oBY160OgnXkn4HllcRUZpSVtVw1lZyxqZnLj4GcjRkFaRJKZfUyI"
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
                    title={"Przejdź dalej"}
                    disabled={!this.state.surveySubmitted}
                    onClick={this.continue} />
            </div>
        </div>;
    }

    private onSurveyLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
        this.setState({
            surveyLoads: this.state.surveyLoads + 1,
            surveySubmitted: this.state.surveyLoads >= 1
        });
    }

    private continue = () => {
        if (confirm("Czy na pewno wypełniłeś i wysłałeś/aś formularz?")) {
            this.props.onContinue();
        }
    }
}
