declare module "*.sass" {
    const styles: { [className: string]: string };

    export default styles;
}

declare module "*.svg" {
    const name: string;

    export default name;
}

declare module "*.png" {
    const name: string;

    export default name;
}
