angular.module('consultorCtrl', ['consultorService'])
    .controller('ConsultorController', function(Consultor, socketio){

        vm = this;

        Consultor.allConsultor()
            .success(function(data){
                vm.consultores = data;
            });

        vm.createConsultor = function(){
            vm.message = '';
            vm.error   = '';
            Consultor.create(vm.consultorData)
                .success(function(data){
                    vm.consultorData = '';
                    vm.message = data.message;
                    vm.error = data.error;
                });
        };



        
        // vm.meConsultor = function(){
        //     vm.message = '';
        //     vm.error   = '';
        //     Consultor.create(vm.consultorData)
        //         .success(function(data){
        //             vm.consultorData = '';
        //             vm.message = data.message;
        //             vm.error = data.error;
        //         });
        // };
        // vm.updateConsultor = function(){
        //     vm.message = '';
        //     vm.error   = '';
        //     Consultor.update(vm.consultorData)
        //         .success(function(data){
        //
        //             // clear up the form
        //             vm.consultorData = '';
        //             vm.message = data.message;
        //             vm.error = data.error;
        //
        //         });
        // };


        // //Inicio dgb ventana modal
        //   //Abrir ventana modal
        //   vm.abrirModal = function($scope){
        //     console.log('----------abrirModal');
        //     console.log($scope);
        //           $scope.showModal = true;
        //   };
        //   //Cerrar ventana modal
        //   vm.cerrarModal = function($scope){
        //           $scope.showModal = false;
        //   };
        //   //Okay ventana modal
        //   vm.okayModal = function($scope){
        //           $scope.showModal = false;
        //   };
        // //Final dgb ventana modal
        //



        socketio.on('consultor', function(data){
            vm.consultores.push(data);
        });
    })

    .controller('AllConsultoresController', function(consultores, socketio){
        var vm = this;
        vm.consultores = consultores.data;

        socketio.on('consultor', function(data){
            vm.consultores.push(data);
        });
    });
