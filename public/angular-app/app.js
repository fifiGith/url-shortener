angular.module('url', ['ngRoute'])
.config(config);

function config($routeProvider, $httpProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('');
	$httpProvider.interceptors.push('AuthInterceptor');

	$routeProvider
		.when('/', {
			templateUrl: '/angular-app/url/url.html',
			controller: urlController,
			controllerAs: 'vm'
		})
		.when('/admin', {
			templateUrl: '/angular-app/admin/admin.html',
			controller: adminController,
			controllerAs: 'vm'
		})
		.when('/admin/login', {
			templateUrl: '/angular-app/auth/auth.html',
			controller: authController,
			controllerAs: 'vm'
		})
		.otherwise({
			redirectTo: '/'
		});
}