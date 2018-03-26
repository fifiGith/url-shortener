angular.module('url').controller('urlController', urlController);

function urlController($http, $route, $location, $window, AuthFactory) {
	var vm = this;
	vm.host = $location.protocol() + "://" + $location.host() + ':' + $location.port() + '/';
	var landingUrl = "http://" + $window.location.host;
	vm.isLoggedIn = AuthFactory.isLoggedIn;
	vm.urlValid = false;
	vm.show = false;
	vm.error = '';
	vm.tempUrl = '';

	$http.get('/api/urllist').then(function(response) {
		vm.url = response.data;
	});

	vm.post = function(res) {
		if (vm.isValid(vm.data)) {
			vm.urlValid = true;
			vm.show = true;
			var newUrl = vm.modUrl(vm.data);
			$http({
    			method: 'POST',
    			url: '/api/add',
    			data: "url=" + newUrl,
    			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				vm.tempUrl = newUrl;
				vm.data = '';
				if (response.status === 201) {
					$http.get('/api/urllist').then(function(response) {
						vm.url = response.data;
					});
				}
			}).catch(function(error) {
				console.log(error);
			});
		} else {
			vm.urlValid = false;
		}
	};

	vm.isValid = function(url) {
		var u = url.toString();
		if (u.substring(0, 3) == 'www') {
			vm.error = '';
			return true;
		} else if (u.substring(0, 4) == 'http' && (u.substring(5, 6) == 's' || (u.substring(4, 7) == '://' || u.substring(5, 8) == '://'))) {
			vm.error = '';
			return true;
		} else {
			vm.error = '* Please enter valid URL *';
			return false;
		}
	};

	vm.modUrl = function(url) {
		var u = url.toString();
		if (u.substring(0, 3) == 'www') {
			u = 'http://' + u;
			return u;
		} else {
			return u;
		}
	};

	vm.compare = function(url, inputUrl) {
		console.log('url', url);
		console.log('inputUrl', inputUrl);
		if (url == inputUrl) {
			return true;
		} else {
			if ('http://' + url == inputUrl) {
				return true;
			} else if ('https://' + url == inputUrl) {
				return true;
			}
			return false;
		}
	}

	vm.logout = function() {
		AuthFactory.isLoggedIn = false;
    	delete $window.sessionStorage.token;
    	$window.location.href = landingUrl;
	};
}