
class PhysicsSystem{
    constructor(){

    }

    init(){

    }

    update(dt){
        let query = new EntityQuery(Transform.mask | Rigidbody.mask);

        while (query.next()){
            let ent = query.get_entity();
            ent.transform.pos.add(ent.rigidbody.vel.prod(dt));
            ent.transform.rot += ent.rigidbody.spin * dt;
        }
    }
};