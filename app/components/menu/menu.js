app.controller('MenuController', ['$rootScope', '$state', 'LocalStorageService', function ($rootScope, $state, LocalStorageService) {
	var vm = this;
	vm.logout = function () {
		LocalStorageService.setItem('login', false);
		$state.go('login');
	}

	vm.activeMenu = function (menuName) {
		return menuName == $rootScope.ToParams ? 'active': '';
	}
}])