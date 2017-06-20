class Controller{
    constructor(model, view){
        this.model = model;
        this.view = view;

        //subscribe to View
        var self = this;
        this.view.shapesPerSecondDecreased.subscribe(function(sender){
            self.model.decShapesPerSecond();
        });
        this.view.shapesPerSecondIncreased.subscribe(function(sender){
            self.model.incShapesPerSecond();
        });
        this.view.gravityDecreased.subscribe(function(sender){
            self.model.decGravity();
        });
        this.view.gravityIncreased.subscribe(function(sender){
            self.model.incGravity();
        });
        this.view.mouseClicked.subscribe(function(sender ,data){
            self.addFigureByMouse(data);
        });

    }
    start(){
        var self = this;
        var second = 1;
        this.view.app.ticker.add(function() {
            if(second==60){
                for(let i = 0 ;i<self.model.shapesPerSecond; i++){
                    self.addFigure()
                }
                second = 1;
            }
            //ANIMATION

            self.model.figures.forEach(function(item , index){
                item.y+= self.model.gravity*item.mass;
                if(item.top>self.view.app.renderer.height+25){
                    self.removeFigure(index);
                    item.clear();
                }
            });
            second++;
        });

    }
    removeFigure(index){

        this.model.removeFigure(index);
    }
    addFigureByMouse(data){
        var tt = new PIXI.Graphics();
        if(!(data.element instanceof Shape)){
            var figure;
            let color = this.getRandomColor();
            let fig = Math.floor(Math.random() * 4);
            switch(fig){
                case 0:
                    figure = new Triangle(data.x-12,data.y-10,color);
                    break;
                case 1:
                    figure = new Rect(data.x-12,data.y-12,color);
                    break;
                case 2:
                    figure = new Elli(data.x,data.y,color);
                    break;
                case 3:
                    figure = new Circle(data.x,data.y,color);
                    break;
            }
            figure.interactive = true;
            figure.buttonMode = true;
            figure.on('pointerdown', this.onClick);
            this.model.addFigure(figure);
        }

    };
    addFigure(){
        var figure;
        let y = -25;
        let x = Math.floor((Math.random() * (this.view.app.renderer.width/2-50))+15);
        let color = this.getRandomColor();
        let fig = Math.floor(Math.random() * 4);

        switch(fig){
            case 0:
                figure = new Triangle(x,y,color);
                break;
            case 1:
                figure = new Rect(x,y,color);
                break;
            case 2:
                figure = new Elli(x,y,color);
                break;
            case 3:
                figure = new Circle(x,y,color);
                break;
        }
        figure.interactive = true;
        figure.buttonMode = true;
        figure.on('pointerdown', this.onClick);
        this.model.addFigure(figure);
    };
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    onClick () {
        model.removeByObj(this)
        this.clear();
    }
    removeByObj(figure){
        this.model.removeByObj(figure);
    }

}
