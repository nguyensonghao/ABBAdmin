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
	    apiKey: "AIzaSyACymEczraf7UWLGZuLaOFfV2Pc_UVKzJk",
	    authDomain: "abbapp-aba85.firebaseapp.com",
	    databaseURL: "https://abbapp-aba85.firebaseio.com",
	    projectId: "abbapp-aba85",
	    storageBucket: "abbapp-aba85.appspot.com",
	    messagingSenderId: "685373680580"
	});
}])