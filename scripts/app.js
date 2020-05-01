import spritesheets from '/scripts/spritesheets.js';
import {createUi} from '/scripts/ui.js';
import {AnimationPlayer} from '/scripts/animations.js';
import {requestAnimationFrameAsync, setTimeoutAsync, Vec2} from '/scripts/utils.js';
import {FpsCounter} from '/scripts/fps.js';

class App {

    ui;
    animationPlayer;
    fpsCounter;

    lastUpdateTime;
    lastRenderTime;
    renderCacheSS;
    renderCacheBoundingSize;

    constructor() {
        this.ui = createUi();
        this.fpsCounter = new FpsCounter(10);
        this.animationPlayer = null;
        this.renderCacheSS = null;
    }

    ssChanged() {
        const {ui} = this;
        const ss = ui.extractSS();
        ui.ssPreviewImage.src = ss.uri;
        this.setAnimationsForSelection();
        this.renderCacheSS = ss;
    }

    animationChanged() {
        const {ui} = this;
        const ss = ui.extractSS();
        const animation = ss.animations[ui.animationSelect.value];
        this.animationPlayer = new AnimationPlayer(animation);

        const [maxWidth, maxHeight] = animation.frames
            .map(frame => frame.key)
            .map(key => ss.sprites[key])
            .map(sprite => sprite.size)
            .reduce((acc, size) => [Math.max(acc[0], size.x), Math.max(acc[1], size.y)], [0,0]);
        this.renderCacheBoundingSize = new Vec2(maxWidth, maxHeight);
    }

    bindUiEvents() {
        const {ui} = this;
        ui.ssSelect.addEventListener("change", () => this.ssChanged());
        ui.animationSelect.addEventListener("change", () => this.animationChanged());
    }

    setSpriteSheetsForSelection() {
        const {ui} = this;
        ui.ssSelect.innerHTML = "";

        spritesheets.forEach(ss => {
            const option = document.createElement("option");
            option.text = ss.name;
            ui.ssSelect.appendChild(option);
        });

        this.ssChanged();
    }

    setAnimationsForSelection() {
        const {ui} = this;
        const ss = ui.extractSS();
        ui.animationSelect.innerHTML = "";

        Object.keys(ss.animations).forEach(animationKey => {
            const option = document.createElement("option");
            option.text = animationKey;
            ui.animationSelect.appendChild(option);
        });

        this.animationChanged();
    }

    update() {
        const now = new Date().getTime();
        const dt = now - this.lastUpdateTime || 0;
        this.animationPlayer.update(dt);
        this.lastUpdateTime = now;

    }

    render() {
        const frame = this.animationPlayer.getCurrentFrame();
        const key = frame.key;
        
        const ss = this.renderCacheSS;
        const sprite = ss.sprites[key];
        
        this.ui.animationCanvas.width = this.renderCacheBoundingSize.x;
        this.ui.animationCanvas.height = this.renderCacheBoundingSize.y;
        
        this.ui.animationCanvasContext.drawImage(
            this.ui.ssPreviewImage,
            sprite.position.x, sprite.position.y, sprite.size.x, sprite.size.y,
            0, 0, sprite.size.x, sprite.size.y,
        );

        // period = 1/freq
        // freq = 1/period
        // period = period(ms) / 1000
        // freq = 1000/period(ms)

        const fps = this.fpsCounter.update();
        this.ui.animationFrameInformationText.innerText = [
            `key: ${key}`,
            `position: ${sprite.position.compact()}`,
            `size: ${sprite.size.compact()}`,
            `bounding: ${this.renderCacheBoundingSize.compact()}`,
            `duration: ${frame.duration}`,
            `fps: ${fps}`
        ].join("\n");
    }
    
    async start() {
        this.bindUiEvents();
        this.setSpriteSheetsForSelection();
        await this.loop();
    }

    async loop() {
        while (true) {
            await requestAnimationFrameAsync();
            this.update();
            this.render();
            await setTimeoutAsync(60);
        }
    }

}

window.addEventListener("DOMContentLoaded", () => new App().start());