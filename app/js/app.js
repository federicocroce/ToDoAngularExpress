'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [ 'ngRoute', 'toaster' ]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: '',
            templateUrl: '../partials/myMain.html'
        })
        .when('/myTasks',
            {
            controller: 'myTasksCtrl',
            templateUrl: 'partials/myTasks.html'
            })
        .when('/myEditTasksName',
        {
            controller: 'myTasksEditNameCtrl',
            templateUrl: 'partials/myEditTasksName.html'
        })
        .when('/myAbout',
        {
            controller: '',
            templateUrl: 'partials/myAbout.html'
        })
        .otherwise({redirectTo: '/'});
}]);



