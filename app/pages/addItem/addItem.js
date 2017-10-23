app.controller('AddItemController', ['$scope', 'DataService', 'UtilService', '$state', '$timeout',
function ($scope, DataService, UtilService, $state, $timeout) {
	var vm = this;
	vm.item = {};

	vm.add = function () {
		UtilService.showLoading();
		var storageRef = firebase.storage().ref();
		var fileName = "item/" + new Date().getTime() + ".png";
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
			})
		}).catch(function (e) {
			UtilService.hideLoading();
			console.log(e);
		}); 
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
}])