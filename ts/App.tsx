import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";

import * as routes from "./Routes";
import { history } from "./history";

import styles from "../styles/index.sass";
import Game from "$pages/Game";
import { Page404 } from "$pages/404";

export function App() {
    return <div className={styles.app}>
        <Router history={history}>
            <Switch>
                <Route path={routes.GamePage}>
                    <Game />
                </Route>
                <Route>
                    <Page404 />
                </Route>
            </Switch>
        </Router>
    </div>;
}
