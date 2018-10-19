import * as React from "react";

import styles from "./styles.sass";

export function Page404() {
    return <div className={styles.content}>
        <div className={styles.title}>404</div>
        <div className={styles.desc}>Ups, nic tu nie ma :(</div>
    </div>;
}
