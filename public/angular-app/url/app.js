angular.module('url', ['ngRoute'])
.config(config)
.controller('urlController', urlController);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'angular-app/url/url.html',
			controller: urlController,
			controllerAs: 'vm'
		});
}

function urlController($http, $route, $location) {
	var vm = this;
	vm.host = $location.protocol() + "://" + $location.host() + ':' + $location.port() + '/';

	vm.post = function() {
		$http({
    		method: 'POST',
    		url: 'add',
    		data: "url=" + vm.data,
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(function(response) {
			if (response.status === 201) {
				$route.reload();
				$http.get('/admin/urllist').then(function(response) {
		vm.url = response.data;
		$route.reload();
	});
			}
		}).catch(function(error) {
			console.log(error);
		});
	};
}