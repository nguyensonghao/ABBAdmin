app.controller('DetailItemController', ['$scope', '$stateParams', 'DataService', 'UtilService', 
	function ($scope, $stateParams, DataService, UtilService) {
	var vm = this;
	var imageBlob;
	vm.item = {};

	var loadData = function () {
		DataService.findById('items', $stateParams.id).then(function (value) {
			vm.item = value;
			vm.item.imageBlob = null;
		})
	}

	vm.update = function () {
		if( validate()){
			if (imageBlob) {
				UtilService.showLoading();
				var storageRef = firebase.storage().ref();
				var fileName = vm.item.imageName;
				storageRef.child(fileName).putString(imageBlob, 'data_url').then(function (snapshot) {
					DataService.update('items', vm.item).then(function (data) {
						UtilService.hideLoading();
						alert("Sửa tiết mục thành công");
					})
				}).catch(function (e) {
					UtilService.hideLoading();
					console.log(e);
				});
			} else {
				DataService.update('items', vm.item).then(function (data) {
					alert("Sửa tiết mục thành công");
				})
			}
		}
		
	}

	$scope.readURL = function (input) {
		if (input.files && input.files[0]) {
			var typeFile = input.files[0].type.split('/')[0];
			if(typeFile != 'image'){
				vm.article.img = '';
				imageBlob = '';
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
		if (!imageBlob && vm.item.img) {
			alert("Hãy chọn ảnh để thêm mới tiết mục");
			return false;
		} else if (!vm.item.title) {
			alert("Hãy thêm tiêu đề để thêm mới tiết mục");
			return false;
		} else if (!vm.item.content) {
			alert("Hãy thêm nội dung để thêm mới tiết mục");
			return false;
		} else {
			return true;
		}
	}

	loadData();
}])