angular.module('admin', ['ngRoute'])
.config(config)
.controller('adminController', adminController);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'angular-app/admin.html',
			controller: adminController,
			controllerAs: 'vm'
		});
}

function adminController($http, $scope) {
	var vm = this;
	vm.title = "Admin's panel";
	$http.get('/admin/urllist').then(function(response) {
		vm.url = response.data;
	});

	$scope.remove = function(id) { 
		$http.delete('/admin/urllist/remove/' + id);
  		console.log("delete");
  		$http.get('/admin/urllist').then(function(response) {
			vm.url = response.data;
		});
	}
}