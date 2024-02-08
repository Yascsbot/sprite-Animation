
class PhysicsSystem{
    constructor(){

    }

    init(){

    }

    update(dt){
        let query = new EntityQuery(Transform.mask | Rigidbody.mask);

        let gravity = new Vec2(0, 20 * dt);

        while (query.next()){
            let ent = query.get_entity();
            ent.transform.pos.add(ent.rigidbody.vel.prod(dt));
            ent.rigidbody.vel.add(gravity);
            ent.transform.rot += ent.rigidbody.spin * dt;
        }
    }
};