class Animator {
    constructor(spriteSheet/*image*/, xStart/*frame start position (x,y)*/, yStart,
        height/*frame start h and w*/, width, frameCount/* how many frames*/, frameDuration/* how lond to point till next*/,
        framePadding/*space between img's*/, reverse/*boolean*/, loop /*boolean*/) {
        Object.assign(this, {
            spriteSheet, xStart, yStart, width, height, frameCount, frameDuration
        });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    };
    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick; 
 if (this.elapsedTime > this.totalTime) this.elapsedTime-= this.totalTime;
        // if (this.isDone()) {
        //     if (this.loop) {
        //         this.elapsedTime -= this.totalTime;
        //     }
        //     else {
        //         return; // if this is excuted your calling drawFrame() on animation that is done!
        //     }
        // }
        let frame = this.currentFrame();
        //if (this.reverse) frame = this.frameCount - frame - 1;

        // ctx.drawImage(this.spriteSheet, 
        //     this.xStart + frame * (this.width + this.framePadding), this.yStart,
        //      this.width, this.height, x, y, this.width, this.height);

        ctx.drawImage(this.spriteSheet, 
            this.xStart + this.width * frame, this.yStart,
             this.width, this.height, x, y, this.width*2, this.height*2);
    };
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration); //tells us how many frames have been displayed to get to the current time
    };
    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };


}