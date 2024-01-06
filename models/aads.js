const mongoose = require('mongoose');

const aadSchema = new mongoose.Schema({
    aadSerial: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
    },
    aadManufacturer: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
    },
    aadType: {
      type: String,
      required: true,
      enum: ['C2 TAN', 'C-MODE', 'C2 STU', 'C2 CMode'],  // TODO
    },
    aadDOM: {
      type: String,  // TODO
      required: true,
    },
    aadDueService: {
      type: String || null,   // TODO
    },
    aadFinal: {
      type: String || null,   // TODO
   },
    jumps: {
      type: Number,
      default: 0,
    },
    rig: {
      type: mongoose.Schema.Types.ObjectId || null,
      ref: 'rig',
    },

  },
);

module.exports = mongoose.model('aad', aadSchema);
