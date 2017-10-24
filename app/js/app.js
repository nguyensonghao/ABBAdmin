app.run(['$rootScope', '$transitions', '$state', function ($rootScope, $transitions, $state) {
	$transitions.onSuccess({ }, function (trans) {
		$rootScope.ToParams = trans.to().name;
		var loginStatus = localStorage.getItem('login');
	    if (loginStatus !== 'true') {
	        $state.go('login');
	    }
	});

	// config firebase
	firebase.initializeApp({
	    apiKey: "AIzaSyACZrquGOI4HS89PBC3GEd2VHQW6eMxYWA",
	    authDomain: "abbapp-b24de.firebaseapp.com",
	    databaseURL: "https://abbapp-b24de.firebaseio.com",
	    projectId: "abbapp-b24de",
	    storageBucket: "abbapp-b24de.appspot.com",
	    messagingSenderId: "970186246171"
	});
}])