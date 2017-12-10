var indexedDB = window.indexedDB

var wrap = {
    request (dbRequest) {
        return new Promise((resolve, reject) => {
            dbRequest.onsuccess = (e) => {
                resolve(e.target.result)
            }

            dbRequest.onerror = (e) => {
                reject(e)
            }
        })        
    },
    transaction (dbTransaction) {
        return {
            objectStore (name) {
                return wrap.objectStore(dbTransaction.objectStore(name));
            }
        }
    },

    objectStore (dbObjectStore) {
        var store = {};
        var operas = ['add', 'clear', 'count', 'createIndex', 'delete', 'deleteIndex', 'get', 'getKey', 'getAll', 'getAllKeys', 'index', 'openCursor', 'openKeyCursor', 'put']

        operas.forEach( (opera) => {
            store[opera] = (opera => {
                return (...args) => wrap.request((args) => dbObjectStore[opera].apply(dbObjectStore, args));
            })(opera)
        });
        return store;
    }
    
}