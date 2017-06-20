var model = new Model();
var view = new View(model, 800, 600);
var controller = new Controller(model,view);
view.init();
controller.start();