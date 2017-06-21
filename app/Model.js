class Model{
    constructor(shapesPerSec = 1, gravity = 1){
        this.figures = [];
        this.shapesPerSecond = shapesPerSec;
        this.gravity = gravity;

        this.modelChanged = new Event(this);
        this.figureAdded = new Event(this);
        this.figureRemoved = new Event(this);
    }
    addFigure(figure){
        this.figures.push(figure);

        this.figureAdded.notify(figure);
    }
    removeFigure(index){
        this.figures.splice(index,1);
        this.figureRemoved.notify(this.figures[index])
    }
    removeByObj(figure){
        this.figures.splice(this.figures.indexOf(figure),1);
        this.figureRemoved.notify(figure)
    }
    incGravity(){
        this.gravity+=1;
        this.modelChanged.notify(this)
    }
    decGravity(){
        if(this.gravity>0){
            this.gravity-=1;
        }
        this.modelChanged.notify(this);
    }
    incShapesPerSecond(){
        this.shapesPerSecond+=1;
        this.modelChanged.notify(this)
    }
    decShapesPerSecond(){
        if(this.shapesPerSecond>0){
            this.shapesPerSecond-=1;
        }
        this.modelChanged.notify(this)
    }
    getArea(){
        var area = 0;
        this.figures.forEach(function(item){
            area += item.area;
        });
        return area;
    }
    getTotal(){
        return this.figures.length;
    }
}
