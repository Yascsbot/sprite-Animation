
class Transform {
    static mask = 0b00000001;

    constructor(){
        this.pos = new Vec2();
        this.rot = 0;
        this.scale = new Vec2();
    }
};

class Rigidbody{
    static mask = 0b00000010;

    constructor(){
        this.vel = new Vec2();
        this.spin = 0;
        this.inv_mass = 1;
        this.friction = 1;
    }
};

class Animation{
    static mask = 0b00000100;

    constructor(){
        this.spritesheet = null
        this.src_size = new Vec2();
        this.src_offset = new Vec2();
        this.dest_size = new Vec2();
        this.dest_offset = new Vec2();
        this.frame_count = 0;
        this.frame_index = 0;
        this.frame_duration = 0;
        this.frame_timer = 0;
    }
};

class Entity{
    constructor(id) {
        this.set_id(id);
        
    }

    set_id(id=0){
        this.id = id; // 0 if entity is unused
        this.mask = 0;
        this.transform = null;
        this.rigidbody = null;
        this.animation = null;
        this.collider = null;
        this.input = null;
        this.camera = null;
    }

    add_transform(){
        if (this.transform == null) {
            this.transform = new Transform();
            this.mask |= Transform.mask;
        }
    }

    remove_transform(){
        this.transform = null;
        this.mask |= Transform.mask;
        this.mask ^= Transform.mask;
    }

    add_rigidbody(){
        if (this.rigidbody == null) {
            this.rigidbody = new Rigidbody();
            this.mask |= Rigidbody.mask;
        }
    }

    remove_rigidbody(){
        this.rigidbody = null;
        this.mask |= Rigidbody.mask;
        this.mask ^= Rigidbody.mask;
    }

    add_animation(){
        if (this.animation == null) {
            this.animation = new Animation();
            this.mask |= Animation.mask;
        }
    }

    remove_animation(){
        this.animation = null;
        this.mask |= Animation.mask;
        this.mask ^= Animation.mask;
    }
    
};

class EntityQuery{
    constructor(include=-1, exclude=0) {
        this.include = include;
        this.exclude = exclude;

        this.index = -1;
        this.entity = null;
    }

    next() {
        let entities = gameEngine.entity_manager.entities
        this.index++;
        while (this.index < entities.length) {
            let ent = entities[this.index];
            if (ent.id != 0){
                let include_passed = ((ent.mask & this.include) == this.include);
                let exclude_passed = ((ent.mask & this.exclude) == 0);
                if (include_passed && exclude_passed) { // found an entity matching our criteria
                    this.entity = ent;  // update our entity reference
                    return true;     // return the entity
                }
            }
            this.index++;
        };
        return false; // if no entity was found
    }

    get_entity(){
        return this.entity;
    }
}

class EntityManager{
    constructor(){
        this.entities = [];
        this.id = 0;
    };

    add_entity(){
        this.id += 1;

        for (let i=0; i<this.entities.length; i++){ // search for a disabled entity
            if (this.entities[i].id == 0) {         // found a disabled entity
                this.entities[i].set_id(this.id);   // enable the found entity
                return this.entities[i];            // return the entity
            }
        };
        let newEntity = new Entity(this.id);                // no entity found. Create a new one
        this.entities.push(newEntity);              // add the entity to the entity array
        return newEntity;                           // return the new entity
    };

    remove_entity(id){
        for (let i=0; i<this.entities.length; i++){
            if (this.entities[i].id == id) {
                this.entities.set_id(0);
                break;
            }
        };
    };

    get_entity(id){
        for (let i=0; i<this.entities.length; i++){
            if (this.entities[i].id == id) {
                return this.entities[i];
            }
        };
    }
};