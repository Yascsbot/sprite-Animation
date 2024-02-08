// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entity_manager = new EntityManager();
        this.render_system = new RenderSystem();
        this.physics_system = new PhysicsSystem();

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();

        this.physics_system.init();
        this.render_system.init();

        // player
        let ent = this.entity_manager.add_entity();
        ent.add_transform();
        ent.transform.pos.set(0, 0);
        ent.add_animation();
        ent.animation.spritesheet = ASSET_MANAGER.getAsset("./sonic.png");
        ent.animation.src_offset.set(1, 0);
        ent.animation.src_size.set(41, 41);
        ent.animation.dest_size.set(41 * 20, 41 * 20);
        ent.animation.frame_count = 1;
        ent.animation.frame_duration = .1;

        // background
        ent = this.entity_manager.add_entity();
        ent.add_transform();
        ent.transform.pos.set(0, 0);
        ent.add_rigidbody();
        ent.rigidbody.vel.set(20, 0);
        ent.add_animation();
        ent.animation.spritesheet = ASSET_MANAGER.getAsset("./sonic.png");
        ent.animation.src_offset.set(1, 0);
        ent.animation.src_size.set(41, 41);
        ent.animation.dest_size.set(41 * 3, 41 * 3);
        ent.animation.frame_count = 6;
        ent.animation.frame_duration = .1;
        //
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.physics_system.update(this.clockTick);
        this.render_system.update(this.clockTick);

    };

};

// KV Le was here :)