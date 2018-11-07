class EventBus{
    constructor(){
        this.events = {};
    }

    emit(eventName, ...params){
        var handlerList = this.events[eventName];
        if(!handlerList){
            return;
        }

        handlerList.forEach(handler => {
            handler.apply(this, params);
        })
    }

    on(eventName, fn){
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
    }
}


var defaultDeventBus = new EventBus();

export default defaultDeventBus;