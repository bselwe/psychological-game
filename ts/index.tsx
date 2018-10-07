import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

const render = () => ReactDOM.render(<App />, document.getElementById("root"));
render();

declare var module: { hot: any };
if (module.hot) {
    module.hot.accept("./App", () => {
        render();
    });
}
