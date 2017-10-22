app.service('DataService', ['$q', function ($q) {
    var service = {};
    var _ref = firebase.database().ref();

    service.insert = function (collection, value) {
        var deferred = $q.defer();
        _ref.child(collection).push(value, function (err) {
            if (err) {
                deferred.resolve(false);
            } else {
                deferred.resolve(true);
            }
        })

        return deferred.promise;
    }

    service.all = function (collection) {
        var deferred = $q.defer();
        _ref.child(collection).on("value", function(list) {
            list = list.val();
            var result = [];
            for (var key in list) {
                list[key]['id'] = key;
                result.push(list[key]);
            }
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    service.findById = function (collection, id) {
        var deferred = $q.defer();
        _ref.child(collection).orderByKey().equalTo(id).once("value", function(item) {
            item = item.val();
            if (item) {
                for (var key in item) {
                    item[key].id = key;
                    deferred.resolve(item[key]);
                    break;    
                }
            } else {
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    service.remove = function (collection, id) {
        var deferred = $q.defer();
        _ref.child(collection).orderByKey().equalTo(id).once("value", function(snapshot) {
            snapshot.forEach(function(child) {
                child.ref.remove();
                deferred.resolve(true);
            });
        });
        return deferred.promise;
    }

    service.update = function (collection, value) {
        var deferred = $q.defer();
        _ref.child(collection + '/' + value.id).update(value, function (data) {
            deferred.resolve(true);
        }).catch(function (err) {
            deferred.resolve(false);
        })
        return deferred.promise;
    }

    return service;
}])