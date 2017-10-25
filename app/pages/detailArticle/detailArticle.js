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
		if(validate()){
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
		
	}

	$scope.readURL = function (input) {
		if (input.files && input.files[0]) {
			var typeFile = input.files[0].type.split('/')[0];
			if(typeFile != 'image'){
				vm.article.img = '';
				imageBlob ='';
				alert("File không hợp lệ");
				return;
			}
            var reader = new FileReader();
		   	reader.readAsDataURL(input.files[0]);
		   	reader.onload = function () {
		     	$('.image').attr('src', reader.result).width(300);
		     	imageBlob = reader.result;
		   	};
        }
	}

	function validate () {
		if (!vm.article.title) {
			alert("Hãy thêm tiêu đề để thêm mới tin tức");
			return false;
		} else if (!vm.article.content) {
			alert("Hãy thêm nội dung để thêm mới tin tức");
			return false;
		} else if (!imageBlob && !vm.article.video && !vm.article.img ) {
			alert("Hãy thêm ảnh hoặc video");
			return false;
		} else if (vm.article.video) {
			if (!UtilService.validateYouTubeUrl(vm.article.video)) {
				alert("Link video không hợp lệ");
				return false;
			}
		}

		return true;
	}

	loadData();
}])