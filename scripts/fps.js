export class FpsCounter {

    lastUpdate;
    dts;
    sum;

    constructor(framesToAverage) {
        this.lastUpdate = new Date().getTime();
        this.dts = new Array(framesToAverage).fill(0);
        this.sum = 0;
    }

    update() {     
        const now = new Date().getTime();
        const dt = now - this.lastUpdate;
        this.sum -= this.dts.pop();

        this.dts.unshift(dt);
        this.sum += dt;
        this.lastUpdate = now;

        const avg = this.sum / this.dts.length;
        return (1000 / avg).toFixed(0);
    }
}