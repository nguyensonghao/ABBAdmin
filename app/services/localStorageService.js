app.service('LocalStorageService', [function () {
    var service = {};
    service.setItem = function (key, value) {            
        localStorage.setItem(key, JSON.stringify(value));                                
    }

    service.getItem = function (key) {                
        var result = localStorage.getItem(key);
        return result ? JSON.parse(result) :null;
    }

    service.deleteItem = function (key) {                        
        localStorage.removeItem(key);                        
    }

    service.clear = function () {
        localStorage.clear();            
    }

    return service;
}])