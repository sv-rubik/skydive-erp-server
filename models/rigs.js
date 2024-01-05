const mongoose = require('mongoose');
// const AAD = require('./aads');

const rigSchema = new mongoose.Schema({
  rigNumber: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  rigName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  rigSize: {
    type: Number,
    required: true,
  },
  rigType: {
    type: String,
    required: true,
    enum: ['tandem', 'student', 'instructor'],
  },
  rigSerial: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  rigDOM: {
    type: String,
    required: true,
  },
  rigDescription: {
    type: String,
    required: false,
  },
  container: {
    type: Number,
    default: 0,
  },
},
  { timestamps: true},
);

module.exports = mongoose.model('rig', rigSchema);
