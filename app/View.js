class View{
    constructor(model, displayW, displayH){
        this.model = model;

        this.displayW = displayW;
        this.displayH = displayH;

        this.app = new PIXI.Application(this.displayW, this.displayH, { antialias: true /*,transparent:true*/});

        this.elements = {};
        this.elements.numberOfShapes = $('#numberOfShapes');
        this.elements.area = $('#area');
        this.elements.decreaseShapesPerSecond = $('#decreaseShapes');
        this.elements.increaseShapesPerSecond = $('#increaseShapes');
        this.elements.shapesPerSecond = $('#shapesPerSecond');
        this.elements.decreaseGravity = $('#decreaseGravity');
        this.elements.increaseGravity = $('#increaseGravity');
        this.elements.gravity = $('#gravity');

        var self = this;

        this.shapesPerSecondDecreased = new Event(this);
        this.shapesPerSecondIncreased = new Event(this);
        this.gravityDecreased = new Event(this);
        this.gravityIncreased = new Event(this);
        this.mouseClicked = new Event(this);

        //notify controller
        this.clicked=function(data){
            self.mouseClicked.notify(data)
        };
        this.elements.decreaseShapesPerSecond.click(function(){
            self.shapesPerSecondDecreased.notify(this)
        });
        this.elements.increaseShapesPerSecond.click(function(){
            self.shapesPerSecondIncreased.notify(this)
        });
        this.elements.decreaseGravity.click(function(){
            self.gravityDecreased.notify(this)
        });
        this.elements.increaseGravity.click(function(){
            self.gravityIncreased.notify(this)
        });
        //subscribe to model change
        this.model.modelChanged.subscribe(function(sender){
            self.updateView(sender);
        });
        this.model.figureAdded.subscribe(function(sender,figure){
            self.drawFigure(sender,figure);
        });
        this.model.figureRemoved.subscribe(function(sender,figure){
            self.clearFigure(sender,figure);
        });

        this.init = ()=>{
            this.elements.numberOfShapes.text(this.model.getTotal());
            this.elements.area.text(this.model.getArea());
            this.elements.shapesPerSecond.text(this.model.shapesPerSecond);
            this.elements.gravity.text(this.model.gravity);

            this.app.stage.scale.x = this.app.stage.scale.y = 1;

            var graphics = new PIXI.Graphics();
            graphics.beginFill(0x2fb997);
            graphics.drawRect(0, 0, this.app.renderer.width, this.app.renderer.height);
            graphics.endFill();
            this.app.stage.addChild(graphics);

            this.app.stage.interactive = true;
            this.app.stage.on('mousedown', click);

            $('#view').append(this.app.view);

        };
        function click(event) {
            let data =
            {"element":event.target,
            "x":event.data.global.x/2,
            "y":event.data.global.y/2
            };
            self.clicked(data);
        }
    }

    drawFigure(model,figure){
        figure.draw();
        this.app.stage.addChild(figure);
        this.updateView(model)
    }
    clearFigure(model,figure){

        this.updateView(model)
    }
    updateView(model){
        this.elements.numberOfShapes.text(model.getTotal());
        this.elements.area.text(model.getArea().toFixed(2));
        this.elements.shapesPerSecond.text(model.shapesPerSecond);
        this.elements.gravity.text(model.gravity);
    }
}
