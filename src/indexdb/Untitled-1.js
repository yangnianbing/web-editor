var indexedDB = window.indexedDB

var db = {
    indexedDB (dbName, config) {

        var wrap = {
            request (dbRequest) {
                return new Promise((resolve, reject) => {
                    dbRequest.onsuccess = (event) => {
                        resolve(event)
                    }

                    dbRequest.onerror = (event) => {
                        reject(event)
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
        
        if (config) {
            if (typeof config === 'number') {
                config = {version: config};
            }
            var version = config.version;
        }

        var dbPromise = wrap.request( () => {
            return indexedDB.open(dbName);
        })

        dbPromise.then( (db, e) => {
            db.onversionchange = () => {
                if (!config && config.onversionchange && config.onversionchange !== false) {
                    db.close();
                }
            }
        }) 


        Object.assign(dbPromise, {
            transaction (storeNames, mode) {
                $.isArray(storeNames) && (storeNames = [storeNames]);
                return dbPromise.then( (e) => {
                        var dbTransaction = e.target.result.transaction(storeNames, mode);  
                        return dbTransaction;
                })
            },
            objectStore (storeName, mode) {
                var curd = ['add', 'delete', 'get', 'put', 'clear', 'count', 'each'];
                var result = {};
                var me = this;

                //to put operation in transaction
                function op(callback){
                        return new Promise ((resolve, reject) => {
                                me.transaction(storeName, mode).then((transaction) => {
                                        var objectStore = transaction.objectStore(storeName);
                                        return callback(objectStore);
                                })
                        })
                }

                function crudOp (opName, args) {
                        return op((wrappedObjectStore) => {
                                return wrappedObjectStore[opName].apply(wrappedObjectStore, args);
                        })
                }

                curd.forEach((op) => {
                    result[op] = ((op) => (...args) => crudOp(op, args))(op)
                })
                return result;
            }
        })
        return dbPromise;
    }

}


console.log(db.indexedDB('test').objectStore('test', 'readwrite').add({a:'1',b:'2'}));
