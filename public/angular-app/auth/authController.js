angular.module('url').controller('authController', authController);

function authController($http, $route, $location, $window, AuthFactory) {
	var vm = this;
	var landingUrl = "http://" + $window.location.host + "/admin";

	if ($window.sessionStorage.token) {
		$window.location.href = landingUrl;
	}

	vm.post = function() {

		var user = {
			username: vm.username,
			password: vm.password
		};

		if (vm.username && vm.password) {
			$http.post('/api/admin/login', user).then(function(response) {
				$window.sessionStorage.token = response.data.token;
				console.log(response);
				$window.location.href = landingUrl;
			}).catch(function(error) {
				if (error) {
					console.log(error);
				}
			});
		}
	}
}