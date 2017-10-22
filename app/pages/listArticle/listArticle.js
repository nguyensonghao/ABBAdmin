app.controller('ListArticleController', ['$scope', 'DataService', 'UtilService', function ($scope, DataService, UtilService) {
	var vm = this;
	vm.articles = [];

	var loadData = function () {
		UtilService.showLoading();
		DataService.all('articles').then(function (data) {
			vm.articles = data;
			UtilService.hideLoading();
		})
	}

	vm.remove = function (id) {
		if (confirm('Bạn có thực sự muốn xóa tiết mục này không?')) {
			DataService.remove('articles', id).then(function (data) {
				for (var i = 0; i < vm.articles.length; i++) {
					if (vm.articles[i].id == id) {
						vm.articles.splice(i, 1);
						break;
					}
				}
			})
		}
	}

	vm.getDate = function (date) {
		date = new Date();
		var month = date.getMonth() + 1;
		if (month < 10)
			month = "0" + month;

		return month + "/" + date.getFullYear();
	}

	vm.getImageNotCache = function (src) {
		return src + "&time=" + new Date().getTime(); 
	}

	loadData();
}])