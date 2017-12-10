var db = {}

function createDB (dbName, version = 1) {
    return new Promise((resolve, reject) => {
        var requuest = window.indexedDB.open(name, version);

        request.onsuccess = (e) => {
            resolve(e.target.result);
        }

        request.onerror = (e) => {
            reject(e)
        }
    })
}

function createStore (dbName, storeName, config) {
    return new Promise((resolve, reject) => {
        
    })
}