export function joinCls(...classes: (undefined | false | string)[]) {
    return classes
        .filter(c => c)
        .join(" ");
}
