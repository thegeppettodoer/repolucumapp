var config = require('../../config.js');
var User = require('../models/user.js');
var Consultor = require('../models/consultor.js');
var Story = require('../models/story.js');

var secretKey = config.secretKey;
var Nro_idBusiness = 'none';//Obteniendo codigo de negocio
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
    var token = jsonwebtoken.sign({
        id: user._id,
        name: user.name,
        username: user.username,
        idBusiness: user.idBusiness
    }, secretKey, {
        expiresIn: 1440
    });

    return token;
}


module.exports = function(app, express, io){

    var api = express.Router();
      api.get('/all_consultores', function(req, res){
        Story.find({}, function(err, consultores){

            if(err){
                res.send(err);
                return;
            }
            console.log('-leer  all consultores');

            res.json(consultores);
        });
    });
    api.get('/all_stories', function(req, res){
        Story.find({}, function(err, stories){

            if(err){
                res.send(err);
                return;
            }

            res.json(stories);
        });
    });

    api.post('/signup', function(req, res){
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            idBusiness: req.body.idBusiness,
            email: req.body.email,
            status: req.body.status,
            dateCreate: req.body.dateCreate,
            //userCreate: req.decoded,
            dateUpdated: req.body.dateUpdated
            //userUpdated: req.decoded
        });

        var token = createToken(user);

        user.save(function(err){
            if(err){
                res.send(err);
                return;
            }
            res.json({
                success: true,
                message: 'User has been created',
                token: token
            });

            console.log(req.body.idBusiness + ' > Se creo el usuario > ' + user.name +'|'+ user.username);

        });
    });

    api.get('/users', function(req, res){
        User.find({}, function(err, users){
            if(err){
                res.send(err);
                return;
            }
            res.json(users);
        });
    });


    api.post('/login', function(req, res){
        User.findOne({
            username: req.body.username
        }).select('name username password idBusiness').exec(function(err, user){
            if(err) throw err;

            if(!user){
                res.send({ message: "Usuario no existe!"});
            } else if (user){
                var validPassword = user.comparePassword(req.body.password);

                if(!validPassword){
                    res.send({message: "Password no valido"});
                } else {
                    // token
                    var token = createToken(user);
                    Nro_idBusiness = user.idBusiness;
                    console.log(Nro_idBusiness + ' > Se conecto el usuario > ' + user.name +'|'+ user.username);
                    res.json({
                        success: true,
                        message: "Exitos al iniciar sesion",
                        token: token,
                        idBusiness: Nro_idBusiness
                    });
                }
            }
        });
    });

    api.use(function(req, res, next){
        //console.log("Somebody just came to our app!");

        // var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        var token = req.query['x-access-token'] || req.headers['x-access-token'];

        // check if token exist
        if(token){
            jsonwebtoken.verify(token, secretKey, function(err, decoded){
                if(err){
                    res.status(403).send({success: false, message: "Failed to authenticate user"});
                    next();

                } else {
                    req.decoded = decoded;
                    //console.log("token: " + token);
                    Nro_idBusiness = req.decoded.idBusiness;
                    console.log(Nro_idBusiness + ' > Se conecto el token > ');
                    if (Nro_idBusiness==='none' && Nro_idBusiness==='undefined') {
                      console.log('Error no se logueo correctamente');
                      res.send(err);
                      res.status(403).send({success: false, message: "No token Provided"});
                    };
                    next();
                }
            });
        } else {
            res.status(403).send({success: false, message: "No token Provided"});
            next();

        }

    });







    //Destino solo para consultores
    // Destination B // provide a logitimate token
    //idConsultant : req.body.idConsultant,
//    $inc: { idConsultant: 1 },

    api.route('/consultor')
        .post(function(req, res){
            var consultor = new Consultor({
              idConsultant : req.body.idConsultant,
              idBusiness: req.decoded.idBusiness,
              name: req.body.name,
              comment: req.body.comment,
              email: req.body.email,
              address: req.body.address,
              phone: req.body.phone,
              officialcode: req.body.officialcode,
              status: req.body.status,
              dateCreate: req.body.dateCreate,
              userCreate: req.decoded.id,
              dateUpdated: req.body.dateUpdated,
              userUpdated: req.decoded.id
            });
            // console.log(Nro_idBusiness);
            // console.log(req.body.idConsultant);
            // console.log(req.decoded.id);
            //consultor.idConsultant.$inc()
            consultor.save(function(err, newConsultor){
              if(err){
                console.log('Error al crear consultor');
                res.send({error:'Ya existe datos relacionados al consultor, verificar!'});
                return;
              };
              // console.log('consultor'+req.decoded.idBusiness);   in(req.decoded.idBusiness).
                io.emit('consultor', newConsultor);
                res.json({
                          message: "Nueva consultor creado!",
                          idBusiness : req.decoded.idBusiness
                });

            });
        })

        .get(function(req, res){
          Nro_idBusiness=req.decoded.idBusiness;
            Consultor.find({ idBusiness: Nro_idBusiness}, function(err, consultores){
                if(err){
                    res.send(err);
                    return;
                };
                console.log(Nro_idBusiness + '> leyendo consultores ');
                res.json({'consultores': consultores, 'idBusiness':req.decoded.idBusiness});
            });
        });


    api.route('/consultor/:id')
        .delete(function(req, res){
            Consultor.findByIdAndRemove(req.params.id,function(err, delConsultor){
              if(err){
                console.log('Error al borrar consultor');
                res.send({error:'Existen dependencias, verificar!'});
                return;
              };
                io.emit('emitconsultorDelete', delConsultor);
                res.json({
                          message: "Borrado consultor!",
                          idBusiness : req.decoded.idBusiness,
                          id:req.params.id
                });

            });
        });

    api.route('/consultor/:id')
      .put(function(req, res) {

        Consultor.update(
          {
            _id : req.params.id},
 					{$set:{
            idConsultant : req.body.idConsultant,
            name : req.body.name,
            comment: req.body.comment,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            officialcode: req.body.officialcode,
            status: req.body.status,
            dateCreate: req.body.dateCreate,
            userCreate: req.decoded.id,
            dateUpdated: req.body.dateUpdated,
            userUpdated: req.decoded.id
          }}
          ,function(err, newConsultorUp){
          if(err){
            console.log('Error al actualizar consultor');
            res.send({error:'Error al actualiza el consultor, verificar!'});
            return;
          };

            Consultor.find({ idBusiness: Nro_idBusiness, _id : req.params.id}, function(err, consultoresUp){
                if(err){
                    res.send(err);
                    return;
                }
                // var emitconsultorUpdate='emitconsultorUpdate'+req.decoded.idBusiness;
                // console.log( req.decoded.idBusiness +'   '+ 'emitconsultorUpdate');
                // io.emit('consultor', consultoresUp);   in(req.decoded.idBusiness).
                io.emit('emitconsultorUpdate', { consultor : [consultoresUp]});
                // console.log(Nro_idBusiness + '> emit luego de actualizar ');
                res.json( {idBusiness : req.decoded.idBusiness});
                res.status(200);
            });


            // res.json({message: "Medico actualizado!"});
        });

      });




    // Destination B // provide a logitimate token

    api.route('/task')
       .post(function(req, res){

          console.log(Nro_idBusiness + ' > Posteando tarea');

            var story = new Story({
              idtask: req.body.idtask,
              task: req.body.task,
              description: req.body.description,
              idEmployee: req.body.idEmployee,
              costInit: req.body.costInit,
              costMiddle: req.body.costMiddle,
              costFinal: req.body.costFinal,
              status: req.body.status,
              dateCreate: req.body.dateCreate,
              userCreate: req.decoded.id,
              dateUpdated: req.body.dateUpdated,
              userUpdated: req.decoded.id
            });

            story.save(function(err, newStory){
              if(err){
                    res.send(err);
                    return;
                }
                io.emit('story', newStory);
                res.json({message: "Nueva tarea creada!"});
            });
        })

         .get(function(req, res){
            Story.find({ userCreate: req.decoded.id}, function(err, stories){
                if(err){
                    res.send(err);
                    return;
                };
                console.log(Nro_idBusiness + ' > Leyendo tareas');


                res.json(stories);
            });
        });




        api.get('/me', function(req, res){
            res.json(req.decoded);
        });

      return api;
};
