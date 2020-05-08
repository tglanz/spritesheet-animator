import {range, Vec2} from '/scripts/utils.js';
import {Animation, AnimationFrame} from '/scripts/animations.js';


class Sprite {

    position;
    size;

    constructor(position, size) {
        this.position = position;
        this.size = size;
        Object.freeze(this);
    }
}

function createCompleteAnimation(sprites, evenDuration) {
    const frames = sprites.map((sprite, idx) => new AnimationFrame(idx, evenDuration));
    return new Animation(frames);
}

function createDwarfSpriteSheet() {
    const rows = 16;
    const cols = 8;

    const size = new Vec2(38, 32);
    let sprites = [];
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            const position = new Vec2(col * size.x, row * size.y + 2);
            sprites.push(new Sprite(position, size));
        }
    }

    function createRow(row, count, durations) {
        const animations = [];
        for (let idx = 0; idx < count; ++idx) {
            const duration = durations.hasOwnProperty('length') ? durations[idx] : durations;
            const frame = new AnimationFrame(row * cols + idx, duration)
            animations.push(frame);
        }
        return new Animation(animations);
    }

    return {
        name: "dwarf",
        uri: "resources/dwarf.png",
        sprites,
        animations: {
            'idle': createRow(0, 5, 150),
            'walk': createRow(1, 8, 150),
            'high attack': createRow(2, 7, 120),
            'middle attack': createRow(3, 6, [500, 150, 100, 50, 50, 150]),
            'jump': createRow(5, 4, [150, 150, 200, 200]),
            complete: createCompleteAnimation(sprites, 150),
        }
    }
}

function createNinjaSpriteSheet() {
    const size = new Vec2(41, 30);
    const actualSize = new Vec2(40, 29);

    const cols = 6;
    const rows = 6;

    let sprites = [];
    for (let col = 0; col < cols; ++col) {
        for (let row = 0; row < 6; ++row) {
            
            if (row == 0 && col == 4) {
                const position = new Vec2(col * size.x + 1, row * size.y + 2);
                const specialSize = new Vec2(40, 28);
                sprites.push(new Sprite(position, specialSize));
            } else {
                const position = new Vec2(col * size.x + 1, row * size.y + 1);
                sprites.push(new Sprite(position, actualSize));
            }
        }
    }


    return {
        name: "ninja",
        uri: "resources/ninja.png",
        sprites,
        animations: {
            attack: new Animation([
                new AnimationFrame(0 + 3 * rows, 300),
                new AnimationFrame(1 + 3 * rows, 250),
                new AnimationFrame(2 + 3 * rows, 150),
            ]),
            jump: new Animation([
                new AnimationFrame(0 + 2 * rows, 300),
                new AnimationFrame(1 + 2 * rows, 250),
                new AnimationFrame(2 + 2 * rows, 200),
                new AnimationFrame(3 + 2 * rows, 100),
            ]),
            idle: new Animation([
                new AnimationFrame(0, 150),
                new AnimationFrame(1, 150),
                new AnimationFrame(2, 150),
                new AnimationFrame(3, 150),
            ]),
            run: new Animation([
                new AnimationFrame(0 + 1 * rows, 120),
                new AnimationFrame(1 + 1 * rows, 120),
                new AnimationFrame(2 + 1 * rows, 120),
                new AnimationFrame(3 + 1 * rows, 120),
                new AnimationFrame(4 + 1 * rows, 120),
                new AnimationFrame(5 + 1 * rows, 120),
            ]),
            swim: new Animation([
                new AnimationFrame(0 + 4 * rows, 150),
                new AnimationFrame(1 + 4 * rows, 150),
                new AnimationFrame(2 + 4 * rows, 150),
                new AnimationFrame(3 + 4 * rows, 150),
                new AnimationFrame(4 + 4 * rows, 150),
                new AnimationFrame(5 + 4 * rows, 150),
            ]),
            complete: createCompleteAnimation(sprites, 150),
        }
    }
}

export default [
    createDwarfSpriteSheet(),
    createNinjaSpriteSheet(),
];