app.controller('DetailArticleController', ['$scope', '$stateParams', 'DataService', 'UtilService', 
	function ($scope, $stateParams, DataService, UtilService) {
	var vm = this;
	var imageBlob;
	vm.article = {};

	var loadData = function () {
		DataService.findById('articles', $stateParams.id).then(function (value) {
			vm.article = value;
			vm.article.date = UtilService.convertDate(vm.article.time);
			vm.article.imageBlob = null;
		})
	}

	vm.update = function () {
		if (imageBlob) {
			UtilService.showLoading();
			var storageRef = firebase.storage().ref();
			var fileName = vm.article.imageName;
			storageRef.child(fileName).putString(imageBlob, 'data_url').then(function (snapshot) {
				DataService.update('articles', vm.article).then(function (data) {
					UtilService.hideLoading();
					alert("Sửa bài đăng thành công");
				})
			}).catch(function (e) {
				UtilService.hideLoading();
				console.log(e);
			});
		} else {
			DataService.update('articles', vm.article).then(function (data) {
				alert("Sửa bài đăng thành công");
			}).catch(function (e) {
				UtilService.hideLoading();
				console.log(e);
			});
		}
	}

	$scope.readURL = function (input) {
		if (input.files && input.files[0]) {
            var reader = new FileReader();
		   	reader.readAsDataURL(input.files[0]);
		   	reader.onload = function () {
		     	$('.image').attr('src', reader.result).width(300);
		     	imageBlob = reader.result;
		   	};
        }
	}

	loadData();
}])