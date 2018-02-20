var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConsultorSchema = new Schema({
  idConsultant: { type: Number, required: true, index: { unique: true} },
  idBusiness: { type: String, required: true, index: { unique: false} },
  name: { type: String, required: true, index: { unique: true} },
  comment: { type: String},
  email: { type: String, required: true, index: { unique: true}},
  address: { type: String },
  phone: { type: String },
  officialcode:  { type: String, required: true, index: { unique: true} },
  status: { type: Boolean },
  dateCreate: { type: Date, default: Date.now},
  userCreate: { type: Schema.Types.ObjectId, ref: 'User'},
  dateUpdated: { type: Date, default: Date.now},
  userUpdated: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Consultor', ConsultorSchema);
//, required: true,ref: 'Consultor'
