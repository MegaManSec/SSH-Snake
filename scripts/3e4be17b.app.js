// Sample project for visualizing JSON files.
//
//   by Keiichiro Ono
//
'use strict';

angular.module('cyViewerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'angular-underscore',
    'colorpicker.module',
    'angularSpinner'
])
    .config(function($routeProvider) {
        // Routing
        $routeProvider
            .when('/', {
                templateUrl: 'main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                 redirectTo: '/'
            });
    });