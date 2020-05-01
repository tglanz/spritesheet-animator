import spritesheets from '/scripts/spritesheets.js';

export const createUi = () => ({
    ssSelect: document.getElementById("spritesheet-select"),
    ssPreviewImage: document.getElementById("spritesheet-preview"),
    animationCanvas: document.getElementById("animation-canvas"),
    animationSelect: document.getElementById("animation-select"),
    animationCanvasContext: document.getElementById("animation-canvas").getContext("2d"),
    animationFrameInformationText: document.getElementById("animation-frame-information-text"),
    
    extractSS() {
        const ssKey = this.ssSelect.value;
        return spritesheets.find(ss => ss.name == ssKey);
    },
    
    extractAnimation() {
        const ss = this.extractSS(context);
        const animationKey = this.animationSelect.value;
        return ss.animations[animationKey];
    },
});