class Shape extends PIXI.Graphics{
    constructor(x,y, color) {
        super();
        
        this.color = color || "0xFF0000";
        this.x = x;
        this.y = y;

        this.mass = Math.random()+0.1;

    }
}
class Triangle extends Shape {
    constructor(x,y, color) {
        super(x,y, color);

        this.area = (Math.sqrt(Math.pow((this.x-this.x+50),2)) + Math.sqrt(Math.pow((this.x+50-this.x),2)+Math.pow((this.y-this.y+50),2)) + Math.sqrt(Math.pow((this.x-this.x+25),2)+Math.pow((this.y-this.y+50),2)))/2;
    }
    get top(){
        return this.y;
    }
    set top( param ){
        param ? this.y = param : this.y = -50;
    }

    draw() {
        this.beginFill(this.color);
        this.drawPolygon([this.x,this.y,this.x+50,this.y,this.x+25,this.y+50]);
        this.endFill();
    }
}

class Rect extends Shape {
    constructor(x,y, color) {
        super(x,y, color);
        this.w = 50;
        this.h = 50;

        this.area = this.w * this.h;
    }
    get top(){
        return this.y;
    }
    set top(param){
        param ? this.y = param :this.y = -this.h;
    }
    draw() {
        this.beginFill(this.color);
        this.drawRect(this.x, this.y, this.w, this.h);
        this.endFill();
    }
}

class Elli extends Shape {
    constructor(x,y, color) {
        super(x,y, color);
        this.w = 30;
        this.h = 24;

        this.area = this.w/2 * this.h/2 * 3.14;
    }
    get top(){
        return this.y - this.h;
    }
    set top( param ){
        param ? this.y = param :this.y = -this.h;
    }
    draw() {
        this.beginFill(this.color);
        this.drawEllipse(this.x, this.y, this.w, this.h);
        this.endFill();
    }
}

class Circle extends Shape {
    constructor(x,y, color) {
        super(x,y, color);
        this.r = 25;

        this.area = Math.pow(this.r,2) * 3.14;
    }
    get top(){
        return this.y-this.r;
    }
    set top(param){
        param ? this.y = param :this.y = -this.r;
    }

    draw() {
        this.beginFill(this.color);
        this.drawCircle(this.x, this.y, this.r);
        this.endFill();
    }
}