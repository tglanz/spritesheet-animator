export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        Object.freeze(this);
    }

    compact() {
        return [this.x, this.y];
    }
}

export const range = count => new Array(count).fill(undefined);
export const requestAnimationFrameAsync = async () => new Promise(requestAnimationFrame);
export const setTimeoutAsync = async interval => new Promise(resolve => setTimeout(resolve, interval));