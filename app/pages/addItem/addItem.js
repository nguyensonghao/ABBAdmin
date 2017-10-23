app.controller('AddItemController', ['$scope', 'DataService', 'UtilService', '$state', '$timeout',
function ($scope, DataService, UtilService, $state, $timeout) {
	var vm = this;
	vm.item = {};

	vm.add = function () {
		var storageRef = firebase.storage().ref();
		var fileName = "item/" + new Date().getTime() + ".png";
		if (validate()) {
			UtilService.showLoading();
			storageRef.child(fileName).putString(vm.item.imageBlob, 'data_url').then(function (snapshot) {
				DataService.insert('items', {
					title: vm.item.title,
					content: vm.item.content,
					img: snapshot.downloadURL,
					video: vm.item.video,
					imageName: fileName,
					num: 0
				}).then(function (result) {
					UtilService.hideLoading();
					$timeout(function () {
						if (confirm('Tạo thành công. Bạn có muốn tạo tiếp không?')) {
							$('#file').val('');
							$('#image').attr('src', '').width(300);
							vm.article = {};
						} else {
							$state.go('list-item');
						}
					}, 500);
				}).catch(function (e) {
					UtilService.hideLoading();
					console.log(e);
				});
			})
		}
	}

	$scope.readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
		   	reader.readAsDataURL(input.files[0]);
		   	reader.onload = function () {
		     	$('#image').attr('src', reader.result).width(300);
		     	vm.item.imageBlob = reader.result;
		   	};
        }
	}
	
	function validate () {
		if (!vm.item.imageBlob) {
			alert("Hãy chọn ảnh để thêm mới tiết mục");
			return false;
		} else if (!vm.item.title) {
			alert("Hãy thêm tiêu đề để thêm mới tiết mục");
			return false;
		} else if (!vm.item.video) {
			alert("Hãy thêm link video để thêm mới tiết mục");
			return false;
		} else if (!validateYouTubeUrl(vm.item.video)) {
			alert("Link video không đúng. Hãy nhập link video youtube để thêm mới tiết mục");
			return false;
		} else if (!vm.item.content) {
			alert("Hãy thêm nội dung để thêm mới tiết mục");
			return false;
		} else {
			return true;
		}
	}

	function validateYouTubeUrl( linkVideo) {
		var url = linkVideo;
		if (url != undefined || url != '') {
			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match && match[2].length == 11) {
				$('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}])