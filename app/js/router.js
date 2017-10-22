var app = angular.module('ABBAdmin', ['ui.router', 'ui.router.state.events']);

app.config(["$stateProvider", "$urlRouterProvider", "$sceProvider", function($stateProvider, $urlRouterProvider, $sceProvider) {
    var loginStatus = localStorage.getItem('login');
    if (loginStatus === 'true') {
        $urlRouterProvider.otherwise('list-item');
    } else {
        $urlRouterProvider.otherwise('login');
    }
    
    $stateProvider
    .state('login', {
        url: '/login',
        views: {
            "main": {
                templateUrl: 'pages/login/login.html',
            }
        }
    })

    .state('add-article', {
        url: '/add-article',
        views: {
            "main": {
                templateUrl: 'pages/addArticle/addArticle.html',
            }
        }
    })

    .state('list-article', {
        url: '/list-article',
        views: {
            "main": {
                templateUrl: 'pages/listArticle/listArticle.html',
            }
        }
    })

    .state('detail-article', {
        url: '/detail-article/:id',
        views: {
            "main": {
                templateUrl: 'pages/detailArticle/detailArticle.html',
            }
        }
    })

    .state('add-item', {
        url: '/add-item',
        views: {
            "main": {
                templateUrl: 'pages/addItem/addItem.html',
            }
        }
    })

    .state('list-item', {
        url: '/list-item',
        views: {
            "main": {
                templateUrl: 'pages/listItem/listItem.html',
            }
        }
    })

    .state('detail-item', {
        url: '/detail-item/:id',
        views: {
            "main": {
                templateUrl: 'pages/detailItem/detailItem.html',
            }
        }
    })

}])