// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Timer {
    constructor() {
        this.gameTime = 0;          //how much game time has passed 
        this.maxStep = 0.05;        // max 
        this.lastTimestamp = 0;     // the last time we updated tick
    };

    tick() {
        const current = Date.now();
        const delta = (current - this.lastTimestamp) / 1000; // in sec
        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, this.maxStep);    //
        this.gameTime += gameDelta;
        return gameDelta;   // how long has it been since last update
    };
};
