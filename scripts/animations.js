export class AnimationFrame {

    // a generic key for the frame.
    key;

    // duration of the frame.
    // units are irrelevant, and subject to domain and player.
    duration;

    constructor(key, duration) {
        this.key = key;
        this.duration = duration;
        Object.freeze(this);
    }
}

export class Animation {

    frames;
    totalDuration;

    constructor(frames) {
        if (!frames) throw new Error("frames argument must be defined");
        this.frames = frames;
        this.totalDuration = frames.reduce((acc, frame) => acc + frame.duration, 0);
        Object.freeze(this);
    }
}

export const ContiuationStrategies = {
    Cyclic: "cyclic",
    Mirror: "mirror",
};

export class AnimationSettings {
    // if true, keep playing the animation after the last frame.
    // how to play the animation is determined by continuationStrategy
    loop = false;
    continuationStrategy = ContiuationStrategies.Cyclic;
}

export class AnimationPlayer {

    // settings on how to play the animation
    settings;

    // the animation to play
    animation;

    cursor;

    constructor(animation, settings) {
        if (!animation) throw new Error("animation argument must be defined");
        this.animation = animation;
        this.settings = settings || new AnimationSettings();
        this.cursor = 0;
    }

    update(dt) {
        this.cursor += 1;
        this.cursor %= this.animation.frames.length;
    }

    getCurrentFrame() {
        return this.animation.frames[this.cursor];
    }
}