

class RenderSystem{
    constructor(){

    }

    init(){
        // todo: change context to "webgl" so we can order objects on-screen by depth value
    }

    update(dt){
        gameEngine.ctx.clearRect(0, 0, gameEngine.ctx.canvas.width, gameEngine.ctx.canvas.height);

        let query = new EntityQuery(Transform.mask | Animation.mask);

        while (query.next()){
            let ent = query.get_entity();
            ent.animation.frame_timer += dt;
            
            if (ent.animation.frame_timer >= ent.animation.frame_duration){
                ent.animation.frame_timer -= ent.animation.frame_duration;
                ent.animation.frame_index += 1;
                ent.animation.frame_index %= ent.animation.frame_count;
            }

            gameEngine.ctx.drawImage(ent.animation.spritesheet,
                ent.animation.src_offset.x + ent.animation.frame_index * ent.animation.src_size.x, 
                ent.animation.src_offset.y,
                ent.animation.src_size.x, 
                ent.animation.src_size.y, 
                ent.transform.pos.x + ent.animation.dest_offset.x, 
                ent.transform.pos.y + ent.animation.dest_offset.y, 
                ent.animation.dest_size.x, ent.animation.dest_size.y);
        }
    }
};