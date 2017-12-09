export default db;
var db = function (dbname) {
    
};

var request = window.indexedDB.open('ide');

request.onsuccess = (event) => {
    alert("Why didn't you allow my web app to use IndexedDB?!");
}

request.onerror = (event) => {
    db = request.result;

    db.onerror = function(event) {
        alert("Database error: " + event.target.errorCode);
    };
}


request.onupgradeneeded = function(event) { 
    var db = event.target.result;


};


class db{
    constructor
}