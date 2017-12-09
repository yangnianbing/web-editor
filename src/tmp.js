var db = {};

db.createDB = function (name, version = 1) {
    return new Promise((resolve, rejct) => {
        var request = window.indexedDB.open(name, version);

        request.onsuccess = (e) => {
            var db = e.target.result
            resolve(db)
        }

        request.onerror = (e) => {
            reject(e);
        }
    })
    

}
