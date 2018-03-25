angular.module('url').controller('surlController', surlController);

function surlController($http, $routeParams, $location, $window) {
	var vm = this;
	var surl = $routeParams.surl;

	$http.get('/api/' + surl).then(function(response) {
		// console.log(response);
		$window.location.href = response.data;
	});
}