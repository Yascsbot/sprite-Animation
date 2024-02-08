
class Vec2 {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    set(x, y){
        this.x = x;
        this.y = y;
    }

    sum(vector){
        return new Vec2(this.x + vector.x, this.y + vector.y);
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }

    diff(vector){
        return new Vec2(this.x - vector.x, this.y - vector.y);
    }

    sub(vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }

    prod(scalar){
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    mul(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }

    quot(scalar){
        return new Vec2(this.x / scalar, this.y / scalar);
    }

    div(scalar){
        this.x /= scalar;
        this.y /= scalar;
    }

    dot(vector){
        return this.x * vector.x + this.y * vector.y;
    }

    wedge(vector){
        return this.x * vector.y - this.y * vector.x;
    }

    perp(){
        return new Vec2(-this.y, this.x);
    }

    rotated(rads){
        let v = new Vec2(Math.cos(rads), Math.sin(rads));
        return new Vec2(v.dot(this), v.wedge(this));
    }

    rotate(rads){
        let v = new Vec2(Math.cos(rads), Math.sin(rads));
        this.x = v.dot(this)
        this.y = v.wedge(this);
    }

    sqrlen(){
        return this.dot(this);
    }

    len(){
        return Math.sqrt(this.sqrlen());
    }

    unit(){
        return this.div(this.len());
    }

    normalize(){
        this.div(this.len());
    }

    copy(vector){
        this.x = vector.x;
        this.y = vector.y;
    }

    clone(){
        return new Vec2(this.x, this.y);
    }

};