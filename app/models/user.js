var mongoose = require('mongoose');
var Schema = mongoose.Schema;;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  //name: { type: String, required: true},
  name: String,
  username: { type: String, required: true, index: { unique: true}},
  password: { type: String, required: true, select: false},
  idBusiness: { type: String, required: true, select: false},
  email: { type: String, required: true, index: { unique: true}},
  status: { type: String },
  dateCreate: { type: Date, default: Date.now},
  userCreate: { type: Schema.Types.ObjectId, ref: 'User'},
  dateUpdated: { type: Date, default: Date.now},
  userUpdated: { type: Schema.Types.ObjectId, ref: 'User'}
});

UserSchema.pre('save', function(next){

  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password){
  var user = this;
//console.log( 'Nombre-comparePassword: ' || user.password  )      ;
  return bcrypt.compareSync(password, user.password);
};



module.exports = mongoose.model('User',UserSchema);
