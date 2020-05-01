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
    const size = new Vec2(36, 36);
    let sprites = [];
    for (let row = 0; row < 16; ++row) {
        for (let col = 0; col < 8; ++col) {
            const position = new Vec2(col * size.x, row * size.y);
            sprites.push(new Sprite(position, size));
        }
    }

    return {
        name: "dwarf",
        uri: "resources/dwarf.png",
        sprites,
        animations: {
            complete: createCompleteAnimation(sprites, .3),
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
            complete: createCompleteAnimation(sprites, .3),
            idle: new Animation([
                new AnimationFrame(0, .3),
                new AnimationFrame(1, .3),
                new AnimationFrame(2, .3),
                new AnimationFrame(3, .3),
            ]),
            run: new Animation([
                new AnimationFrame(0 + 1 * rows, .3),
                new AnimationFrame(1 + 1 * rows, .3),
                new AnimationFrame(2 + 1 * rows, .3),
                new AnimationFrame(3 + 1 * rows, .3),
                new AnimationFrame(4 + 1 * rows, .3),
                new AnimationFrame(5 + 1 * rows, .3),
            ]),
            jump: new Animation([
                new AnimationFrame(0 + 2 * rows, .3),
                new AnimationFrame(1 + 2 * rows, .3),
                new AnimationFrame(2 + 2 * rows, .3),
                new AnimationFrame(3 + 2 * rows, .3),
            ]),
            attack: new Animation([
                new AnimationFrame(0 + 3 * rows, .3),
                new AnimationFrame(1 + 3 * rows, .3),
                new AnimationFrame(2 + 3 * rows, .3),
            ]),
            swim: new Animation([
                new AnimationFrame(0 + 4 * rows, .3),
                new AnimationFrame(1 + 4 * rows, .3),
                new AnimationFrame(2 + 4 * rows, .3),
                new AnimationFrame(3 + 4 * rows, .3),
                new AnimationFrame(4 + 4 * rows, .3),
                new AnimationFrame(5 + 4 * rows, .3),
            ]),
        }
    }
}

export default [
    createNinjaSpriteSheet(),
    createDwarfSpriteSheet(),
];