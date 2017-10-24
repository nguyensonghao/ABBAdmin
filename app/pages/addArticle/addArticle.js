app.controller('AddArticleController', ['$scope', 'UtilService', 'DataService', '$state', '$timeout', 'UtilService',
function ($scope, UtilService, DataService, $state, $timeout, UtilService) {
	var vm = this;
	vm.article = {};

	vm.add = function () {
		var storageRef = firebase.storage().ref();
		var fileName = "article/" + new Date().getTime() + ".png";
		if(validate()) {
			UtilService.showLoading();
			if (vm.article.imageBlob) {
				var storageRef = firebase.storage().ref();
				var fileName = "article/" + new Date().getTime() + ".png";
				storageRef.child(fileName).putString(vm.article.imageBlob, 'data_url').then(function (snapshot) {			
					DataService.insert('articles', {
						title: vm.article.title,
						content: vm.article.content,
						img: snapshot.downloadURL,
						time: new Date().getTime(),
						imageName: fileName,
						video: vm.article.video
					}).then(function (result) {
						UtilService.hideLoading();
						$timeout(function () {
							if (confirm('Tạo thành công. Bạn có muốn tạo tiếp không?')) {
								$('#file').val('');
								$('#image').attr('src', '').width(300);
								vm.article = {};
							} else {
								$state.go('list-article');
							}
						}, 500);
					})
				}).catch(function (e) {
					console.log(e);
					UtilService.hideLoading();
				})
			} else {
				DataService.insert('articles', {
					title: vm.article.title,
					content: vm.article.content,
					time: new Date().getTime(),
					imageName: fileName,
					video: vm.article.video
				}).then(function (result) {
					UtilService.hideLoading();
					$timeout(function () {
						if (confirm('Tạo thành công. Bạn có muốn tạo tiếp không?')) {
							$('#file').val('');
							$('#image').attr('src', '').width(300);
							vm.article = {};
						} else {
							$state.go('list-article');
						}
					}, 500);
				}).catch(function (e) {
					console.log(e);
					UtilService.hideLoading();
				})
			}
		}		
	}

	$scope.readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
		   	reader.readAsDataURL(input.files[0]);
		   	reader.onload = function () {
		     	$('#image').attr('src', reader.result).width(300);
		     	vm.article.imageBlob = reader.result;
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
		} else if (!vm.article.imageBlob && !vm.article.video) {
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
}])