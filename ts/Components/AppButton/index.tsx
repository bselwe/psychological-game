import * as React from "react";

import { joinCls } from "$utils/JoinClasses";

import styles from "./styles.sass";

interface AppButtonProps {
    readonly disabled?: boolean;
    readonly title: string;
    readonly className?: string;
    readonly onClick: () => void;
}

export function AppButton(props: AppButtonProps) {
    return <div
        className={joinCls(styles["button"], props.className, props.disabled ? styles["disabled"] : undefined)}
        onClick={!props.disabled ? props.onClick : undefined}>
        {props.title}
    </div>;
}
