app.controller('ListItemController', ['$scope', 'DataService', 'UtilService', '$timeout', function ($scope, DataService, UtilService, $timeout) {
	var vm = this;
	vm.items = [];

	var loadData = function () {
		UtilService.showLoading();
        firebase.database().ref('items').on("value", function(list) {
            list = list.val();
            var result = [];
            for (var key in list) {
                list[key]['id'] = key;
                result.push(list[key]);
            }
            
            $timeout(function () {
            	vm.items = result;
            	UtilService.hideLoading();
            })
        });
	}

	vm.remove = function (id) {
		if (confirm('Bạn có thực sự muốn xóa tiết mục này không?')) {
			DataService.remove('items', id);
		}
	}

	vm.getImageNotCache = function (src) {
		return src + "&time=" + new Date().getTime(); 
	}

	loadData();
}])