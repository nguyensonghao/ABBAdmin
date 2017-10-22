app.service('UtilService', ['$q', function ($q) {
    var service = {};

    service.showLoading = function () {
        $('.loading-container').css('display', 'block');
    }

    service.hideLoading = function () {
        $('.loading-container').css('display', 'none');
    }

    service.convertDate = function (date) {
    	date = new Date();
		var month = date.getMonth() + 1;
		if (month < 10)
			month = "0" + month;

		return month + "/" + date.getFullYear();
    }

    return service;
}])