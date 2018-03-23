angular.module('auth', ['ngRoute'])
.config(config)
.controller('authController', authController)
.factory('AuthInterceptor', AuthInterceptor);

function config($routeProvider, $httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');

	$routeProvider
		.when('/', {
			templateUrl: '/angular-app/auth/auth.html',
			controller: authController,
			controllerAs: 'vm'
		});
}

function authController($http, $route, $location, $window) {
	var vm = this;

	vm.post = function() {

		var user = {
			username: vm.username,
			password: vm.password
		};

		$http.post('/admin/login', user).then(function(response) {
			$window.sessionStorage.token = response.data.token;
			var landingUrl = "http://" + $window.location.host + "/admin";
			$window.location.href = landingUrl;
		});
	}
}

function AuthInterceptor($location, $window) {
    return {
        request: request
    };
    
    function request(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
            config.headers.authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        console.log(config);
        return config;
    }
}
