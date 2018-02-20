angular.module('consultorCtrl', ['consultorService'])
    .controller('ConsultorController', function(Consultor, socketio) {

        vm = this;
        vm.cancelarConsultor = {};
        // vm.idBusiness='';
        // var socket_name_new='';
        // var socket_name_upd='';
         Consultor.allConsultor()
            .success(function(data) {
                vm.consultores = data.consultores;
                vm.idBusiness = data.idBusiness;
            });

        vm.createConsultor = function() {
            vm.message = '';
            vm.error = '';
            Consultor.create(vm.consultorData)
                .success(function(data) {
                    vm.idBusiness = data.idBusiness;
                    // socket_name_new = 'consultor'+vm.idBusiness ;
                    // console.log('socket_name_new');
                    // console.log(socket_name_new);
                    vm.consultorData = '';
                    vm.message = data.message;
                    vm.error = data.error;
                });
        };

        vm.updateConsultor = function() {
            vm.message = '';
            vm.error = '';
            Consultor.update(vm.actualizarConsultor)
                .success(function(data) {
                    vm.idBusiness = data.idBusiness;
                    // socket_name_upd = 'emitconsultorUpdate'+vm.idBusiness;
                    console.log('/'+vm.idBusiness);
                    console.log('updaettete');
                    // console.log(socket_name_upd);
                    vm.actualizarConsultor = '';
                    vm.message = data.message;
                    vm.error = data.error;
                });
        };


        vm.deleteConsultor = function() {
            vm.message = '';
            vm.error = '';
            Consultor.delete(vm.actualizarConsultor)
                .success(function(data) {
                    vm.idBusiness = data.idBusiness;
                    vm.actualizarConsultor = '';
                    vm.message = data.message;
                    vm.error = data.error;
                });
        };



        vm.selectConsultor = function(newconsultor) {
            vm.message = '';
            vm.error = '';
            vm.actualizarConsultor = newconsultor;

            if (newconsultor != undefined && newconsultor != null) {
                vm.cancelarConsultor = {};
                angular.copy(newconsultor, vm.cancelarConsultor);
            };
        };


        vm.cancelConsultor = function() {
            vm.actualizarConsultor = vm.cancelarConsultor;

            for (var i = 0; i < vm.consultores.length; i++) {
                if (vm.consultores[i]._id == vm.cancelarConsultor._id) {
                    vm.consultores[i] = vm.cancelarConsultor;
                };
            };

        };


        socketio.on('consultor' , function(data) {
            // console.log(data);
            // console.log(data.idBusiness +'=consultor='+ vm.idBusiness);
            if (data.idBusiness == vm.idBusiness) {
              vm.consultores.push(data);
            };
        });


        socketio.on('emitconsultorUpdate', function(data) {
            // console.log(vm.idBusiness +'=emitconsultorUpdate='+  data.consultor[0][0].idBusiness);
            if (vm.idBusiness == data.consultor[0][0].idBusiness) {
                  for (var i = 0; i < vm.consultores.length; i++) {
                      if (vm.consultores[i]._id == data.consultor[0][0]._id) {
                          vm.consultores[i] = data.consultor[0][0]; //.push(data.consultor[0][0]);
                      };
                  };
            };
        });

        socketio.on('emitconsultorDelete', function(data) {
            if (vm.idBusiness == data.idBusiness) {
                  for (var i = 0; i < vm.consultores.length; i++) {
                      if (vm.consultores[i]._id == data._id) {
                        console.log('borrardo'+data._id);
                          // vm.consultores[i] = {};//data.consultor[0][0]; //.push(data.consultor[0][0]);
                          vm.consultores.splice(i, 1);

                          // delete vm.consultores[i];

                      };
                  };
            };
        });






    })

.controller('AllConsultoresController', function(consultores, socketio) {
    var vm = this;
    vm.consultores = consultores.data;
    socketio.on('consultor', function(data) {
        vm.consultores.push(data);
    });
});
