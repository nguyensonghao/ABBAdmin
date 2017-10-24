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

    service.validateYouTubeUrl = function (linkVideo) {
        var url = linkVideo;
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                $('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
                return true;
            } 
        }
        
        return false;
    }

    return service;
}])