angular.module('consultorService', [])
    .factory('Consultor', function($http) {
        var consultorFactory = {};


        consultorFactory.allConsultores = function() {
            return $http.get('/api/all_consultores');
        };

        consultorFactory.create = function(consultorData) {
            return $http.post('/api/consultor', consultorData);
        };
        consultorFactory.delete = function(consultorDelData) {
            return $http.delete('/api/consultor/'+consultorDelData._id, consultorDelData);
        };
        consultorFactory.update = function(consultorUpData) {
           return $http.put('/api/consultor/'+consultorUpData._id, consultorUpData);
        };

        consultorFactory.allConsultor = function() {
          //console.log('Service consultor all consultor');
            return $http.get('/api/consultor');
        };
        return consultorFactory;
    })

.factory('socketio', function($rootScope) {
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },

        emit: function(eventName, data, callback) {
            var args = arguments;
            $rootScope.apply(function() {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        }
    };
});
