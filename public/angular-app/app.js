angular.module('url', ['ngRoute'])
.config(config)
.run(run);

function config($routeProvider, $httpProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('');
	$httpProvider.interceptors.push('AuthInterceptor');

	$routeProvider
		.when('/', {
			templateUrl: '/angular-app/url/url.html',
			controller: urlController,
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/admin', {
			templateUrl: '/angular-app/admin/admin.html',
			controller: adminController,
			controllerAs: 'vm',
			access: {
				restricted: true
			}
		})
		.when('/admin/login', {
			templateUrl: '/angular-app/auth/auth.html',
			controller: authController,
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/:surl', {
			template: " ",
			controller: surlController,
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.otherwise({
			redirectTo: '/'
		});
}

function run($rootScope, $location, $window, AuthFactory) {
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
			event.preventDefault();
			var landingUrl = "http://" + $window.location.host + '/admin/login';
			$window.location.href = landingUrl;
		}
	});
}