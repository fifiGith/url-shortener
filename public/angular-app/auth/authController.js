angular.module('url').controller('authController', authController);

function authController($http, $route, $location, $window, AuthFactory) {
	var vm = this;
	var landingUrl = "http://" + $window.location.host;
	vm.error = '';

	if (AuthFactory.isLoggedIn) {
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
				vm.error = '';
			}).catch(function(error) {
				if (error) {
					vm.error = '* Wrong username or password *';
				}
			});
		} else {
			vm.error = '* Please enter username and password *';
		}
	}
}