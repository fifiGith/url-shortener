angular.module('url').controller('adminController', adminController);

// function config($routeProvider, $httpProvider) {

// 	$routeProvider
// 		.when('/', {
// 			templateUrl: '/angular-app/admin/admin.html',
// 			controller: adminController,
// 			controllerAs: 'vm'
// 		});
// }

function adminController($http, $route, $location) {
	var vm = this;
	vm.host = $location.protocol() + "://" + $location.host() + ':' + $location.port() + '/';
	vm.title = "Admin's panel";
	$http.get('/api/urllist').then(function(response) {
		vm.url = response.data;
	});

	vm.remove = function(id) { 
		$http.delete('/api/urllist/remove/' + id);
  		// console.log("delete", id);
  		$route.reload();
	}
}