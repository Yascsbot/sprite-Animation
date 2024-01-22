class sonic {
    
    constructor(game, x, y, spritesheet){
        // Object.assign(this, {game, x, y, spritesheet});
        this.game = game;
        //Sonic state
        this.size = 0;
        this.facing =0;
        this.state =0;
        this.velocity = 0;
//  xStart/*frame start position (x,y)*/, yStart, height/*frame start h and w*/, width, frameCount/* how many frames*/, frameDuration/* how lond to point till next*/,
//framePadding/*space between img's*/, reverse/*boolean*/, loop /*boolean*/
        this.animation = new Animator(ASSET_MANAGER.getAsset("./sonic.png"), 0, 0, 45, 39, 3, .3);
        this.x =0;
        this.y=0;
        this.speed = 25;

    };
    update() { 
        this.x += this.speed * this.game.clockTick;
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./sonic.png"), 0, 0)
    };




}