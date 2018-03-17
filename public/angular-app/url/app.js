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

function urlController($http, $route) {
	var vm = this;

	vm.post = function() {
		$http({
    		method: 'POST',
    		url: 'add',
    		data: "url=" + vm.url,
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(function(response) {
			if (response.status === 201) {
				$route.reload();
			}
		}).catch(function(error) {
			console.log(error);
		});
	};
}