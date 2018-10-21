export function getTimeBetweenMs(minSeconds: number, maxSeconds: number) {
    const minMs = minSeconds * 1000;
    const maxMs = maxSeconds * 1000;
    return Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
}
