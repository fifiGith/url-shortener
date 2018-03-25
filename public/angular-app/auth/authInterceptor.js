angular.module('url').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $window) {
    return {
        request: request
    };
    
    function request(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
    }
}
