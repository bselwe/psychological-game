import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";

import * as routes from "./Routes";
import { history } from "./history";

import styles from "../styles/index.sass";
import { Welcome } from "./Pages/Welcome";

export function App() {
    return <div className={styles["app"]}>
        <Router history={history}>
            <Switch>
                <Route path={routes.DefaultPage}>
                    <Welcome />
                </Route>
            </Switch>
        </Router>
    </div>;
}
