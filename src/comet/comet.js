import idGenerator from './idGenerator'

var handlerPoll = {};
var serverHost = 'ws://localhost/ws';

export   function registerSocket(fn){
    if(!window.connect){
        comet();
    }
    if(fn && typeof fn === 'function'){
        var regisId =  idGenerator.next();
        handlerPoll[regisId] = fn;
        return regisId;
    }
    return null;
}


export function comet(){
    if(window.connect){
        return;
    }
    var WebSocket = window.WebSocket;
    var connect = window.connect = new WebSocket(serverHost);

    if(connect){
        connect.onopen = onOpen;
        connect.onclose = onClose;
        connect.onmessage = onMessage;
        connect.onerror = onError;
    }
    
    function onOpen(e){
        console.log('socket connect', e);
    }
    function onClose(e){
        console.log('socket close', e)
    }
    function onMessage(e){
        var keys = Object.keys(handlerPoll);

        keys.forEach(key => {
            try{
                handlerPoll[key].call(null, e)
            }catch(e){
                console.log('id :  %s error, handler : ', key,  handlerPoll[key]);
            }
        })
    }
    function onError(e){
        console.log('socket error', e);
    }

}
