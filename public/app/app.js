//, 'storyService', 'storyCtrl', 'reverseDirective'
angular
    .module('GcMedico', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService','consultorCtrl','consultorService','storyCtrl','storyService', 'reverseDirective' ])
    .config(function($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');
    });
