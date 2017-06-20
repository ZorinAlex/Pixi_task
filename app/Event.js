class Event{
    constructor(sender){
        this.sender = sender;
        this.listeners = []
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    notify(args) {
        var index;
        for (index = 0; index < this.listeners.length; index += 1) {
            this.listeners[index](this.sender, args);
        }
    }
}