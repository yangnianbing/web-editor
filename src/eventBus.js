class EventBus{
    constructor(){
        this.events = {};
    }

    emit(eventName, ...params){
        var handlerList = this.events[eventName];
        if(!handlerList){
            return;
        }

        var handlers = []
        handlerList.forEach(handler => {
            handlers.push(exec(handler, params));
        })

        return Promise.all(handlers);

        function exec(handler, params){
            return new Promise(async (resolve, reject) => {
                var result = await handler.apply(this, params)
                resolve(result);
            })
        }
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