angular.module('admin', ['ngRoute'])
.config(config)
.controller('adminController', adminController);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'angular-app/admin/admin.html',
			controller: adminController,
			controllerAs: 'vm'
		});
}

function adminController($http, $route) {
	var vm = this;
	vm.title = "Admin's panel";
	$http.get('/admin/urllist').then(function(response) {
		vm.url = response.data;
	});

	vm.remove = function(id) { 
		$http.delete('/admin/urllist/remove/' + id);
  		console.log("delete", id);
  		$route.reload();
	}
}