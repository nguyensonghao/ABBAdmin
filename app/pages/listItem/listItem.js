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
            	$timeout(function () {
            		getPercentVote();
            	})
            	UtilService.hideLoading();
            })
        });
	}

	var getPercentVote = function () {
		var sumVote = vm.sumVote();
		var sumPercent = 0;
		for (var i = 0; i < vm.items.length; i++) {
			if (i < vm.items.length - 1) {
				var percent = parseInt(vm.items[i].num / sumVote * 100) / 100 * 100;
				sumPercent += percent;
				vm.items[i].percent = percent + "%";
			} else {
				vm.items[i].percent = (100 - sumPercent) + "%"
			}
		}
	}

	vm.remove = function (id) {
		if (confirm('Bạn có thực sự muốn xóa tiết mục này không?')) {
			DataService.remove('items', id);
		}
	}

	vm.getImageNotCache = function (src) {
		return src + "&time=" + new Date().getTime(); 
	}

	vm.sumVote = function () {
		var sum = 0;
		for (var i = 0; i < vm.items.length; i++) {
			sum += vm.items[i].num;
		}

		return sum;
	}

	vm.percentVote = function (vote) {		
		var sum = 0;
		for (var i = 0; i < vm.items.length; i++) {
			sum += vm.items[i].num;
		}

		return sum ? vote / sum * 100 + "%" : "0%";
	}

	loadData();
}])