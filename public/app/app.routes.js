angular.module('appRoutes', ['ngRoute'] )
    .config(function( $routeProvider, $locationProvider){
      $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .when('/login', {
                templateUrl: 'app/views/pages/login.html'
            })
            .when('/signup', {
                templateUrl: 'app/views/pages/signup.html'
            })
            .when('/task', {
                templateUrl: 'app/views/pages/task.html'
            })
            .when('/logout', {
                templateUrl: 'app/views/pages/logout.html'
            })
            .when('/consultor', {
                templateUrl: 'app/views/pages/consultor.html'
            })
            .when('/consultor/:id', {
                templateUrl: 'app/views/pages/consultor.html'
            })
            .when('/allstories', {
                            templateUrl: 'app/views/pages/allStories.html',
                            controller: 'AllStoriesController',
                            controllerAs: 'story',
                            resolve: {
                                stories: function(Story){
                                    return Story.allStories();
                                }
                            }
            });
            //.when('/logout', {
            //    templateUrl: 'app/views/index.html'
            //})
            // .when('/allStories', {
            //     templateUrl: 'app/views/pages/allStories.html',
            //     controller: 'AllStoriesController',
            //     controllerAs: 'story',
            //     resolve: {
            //         stories: function(Story){
            //             return Story.allStories();
            //         }
            //     }
            // });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    })  ;


//
// angular.module('appRoutes', ['ngRoute'] )
//       .config(function($stateProvider){
//       $stateProvider
//           .state('/', {
//               url: "",
//               views: {
//                   "viewMain": {
//                       templateUrl: 'app/views/pages/home.html',
//                       controller: 'MainController',
//                       controllerAs: 'main'
//                   },
//                   "viewB": {
//                       templateUrl: 'app/views/pages/home.html'
//                   }
//               }
//           })
//           .state('login', {
//               url: "/login",
//               views: {
//                   "viewMain": {
//                       templateUrl: 'app/views/pages/login.html'
//                   }
//               }
//           })
//           .state('signup', {
//               url: "/signup",
//               views: {
//                   "viewMain": {
//                       templateUrl: 'app/views/pages/signup.html'
//                   }
//               }
//           })
//           .state('task', {
//               url: "/task",
//               views: {
//                   "viewMain": {
//                       templateUrl: 'app/views/pages/task.html'
//                   }
//               }
//           })
//           .state('logout', {
//               url: "/signup",
//               views: {
//                   "viewMain": {
//                       templateUrl: 'app/views/pages/logout.html'
//                   }
//               }
//           })
//           .state('consultor', {
//               url: "/consultor",
//               views: {
//                   "viewMain": {
//                       templateUrl: 'app/views/pages/consultor.html'
//                   },
//                   "view2": {
//                         templateUrl: 'app/views/pages/home.html'
//                     }
//               }
//           })
//           .state('logout', {
//               url: "/signup",
//               views: {
//                   "viewMain": {
//                       templateUrl: 'app/views/pages/logout.html'
//                   }
//               }
//           })
//       })
