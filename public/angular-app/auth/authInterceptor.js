angular.module('url').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $window, AuthFactory) {
    return {
        request: request,
        response: response
    };
    
    function request(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
    }

    function response(response) {
        if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            AuthFactory.isLoggedIn = true;
        }
        if (response.status === 401) {
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response);
    }
}
