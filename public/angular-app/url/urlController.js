angular.module('url').controller('urlController', urlController);

// function config($routeProvider) {
// 	$routeProvider
// 		.when('/', {
// 			templateUrl: 'angular-app/url/url.html',
// 			controller: urlController,
// 			controllerAs: 'vm'
// 		});
// }

function urlController($http, $route, $location) {
	var vm = this;
	vm.host = $location.protocol() + "://" + $location.host() + ':' + $location.port() + '/';
	vm.show = false;

	$http.get('/api/urllist').then(function(response) {
		vm.url = response.data;
	});

	vm.post = function(res) {
		$http({
    		method: 'POST',
    		url: '/api/add',
    		data: "url=" + vm.data,
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(function(response) {
			if (response.status === 201) {
				$http.get('/api/urllist').then(function(response) {
					vm.url = response.data;
					vm.show = true;
				});
			}
		}).catch(function(error) {
			console.log(error);
		});
	};
}