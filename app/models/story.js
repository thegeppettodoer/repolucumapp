var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorySchema = new Schema({
  idtask: { type: Number },
  task: { type: String},
  description: { type: String},
  idEmployee: { type: String},
  costInit: { type: Number },
  costMiddle: { type: Number },
  costFinal: { type: Number },
  status: { type: String },
  dateCreate: { type: Date, default: Date.now},
  userCreate: { type: Schema.Types.ObjectId, ref: 'User'},
  dateUpdated: { type: Date, default: Date.now},
  userUpdated: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Story', StorySchema);
