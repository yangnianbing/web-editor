import idGenerator from './idGenerator'

var handlerPoll = {};
var serverHost = 'ws://localhost:8888';

function registerSocket(fn){
    if(!window.connection){
        comet();
    }
    if(fn && typeof fn === 'function'){
        var regisId =  idGenerator.next();
        handlerPoll[regisId] = fn;
        return regisId;
    }
    return null;
}

function send(msg, fn){
    if(!window.connection){
        comet({onOpen : function(){
            window.connection.send(JSON.stringify(msg));
            fn && fn();
        }});
    }else{
         window.connection.send(JSON.stringify(msg));
         fn && fn();
    }
}


function comet(params){
    if(window.connection){
        return;
    }
    var WebSocket = window.WebSocket;
    var connection = window.connection = new WebSocket(serverHost);

    if(connection){
        connection.onopen = onOpen;
        connection.onclose = onClose;
        connection.onmessage = onMessage;
        connection.onerror = onError;
    }
    
    function onOpen(e){
        params.onOpen && params.onOpen(e);
        console.log('socket connect', e);
    }
    function onClose(e){
        console.log('socket close', e)
    }
    function onMessage(e){
        console.log(e);
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

export {registerSocket, send}