app.controller('LoginController', ['$scope', '$state', 'LocalStorageService', function ($scope, $state, LocalStorageService) {
	var vm = this;
	vm.user = {};

	LocalStorageService.setItem('login', false);
	vm.login = function () {
		if (vm.user.email == 'admin@gmail.com' && vm.user.password == '123456') {
			LocalStorageService.setItem('login', true);
			$state.go('list-article');
		} else {
			alert("Email hoặc mật khẩu không đúng");
		}
	}
}])