// Import AAD model made by aadSchema
const mongoose = require('mongoose');
const AAD = require('../models/aads');

const BadRequestError = require('../utils/errors/BadRequestError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError');
const Rig = require("../models/rigs"); // 404

// Get the list of AADs
const getAADsList = (req, res, next) => {
  AAD.find({})
    .then((aadsList) => res.status(200).send(aadsList))
    .catch((err) => next(err));
};

// Create new AAD
const createAAD = (req, res, next) => {
  const aadData = req.body;
  // Ensure rig is null if not provided
  if (!aadData.rig) {
    aadData.rig = null;
  }
  AAD.create(aadData)
    .then((aadData) => res.status(201).send(aadData))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Not correct data passed'));
      } else { next(err); }
    });
};

// Update AAD info by AAD Serial Number
// const updateAADInfo = (req, res, next) => {
//   const aadData = req.body;
//   // Ensure rig is null if not provided
//   if (!aadData.rig) {
//     aadData.rig = null;
//   }
//   AAD.findOneAndUpdate({aadSerial: aadData.aadSerial}, aadData, {
//     new: true,
//     runValidators: true,
//   })
//     .orFail()
//     .then((updatedAADData) => res.status(200).send(updatedAADData))
//     .catch((err) => {
//       if (err instanceof mongoose.Error.ValidationError) {
//         next(new BadRequestError('Not correct data passed'));
//       } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
//         next(new NotFoundError('AAD not found'));
//       } else { next(err); }
//     });
// };

// Update AAD info by AAD _id
const updateAADInfo = (req, res, next) => {
  const aadData = req.body;
  // Ensure rig is null if not provided
  if (!aadData.rig) {
    aadData.rig = null;
  }
  AAD.findByIdAndUpdate(req.params.aadId, aadData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((updatedAADData) => res.status(200).send(updatedAADData))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Not correct data passed'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('AAD not found'));
      } else { next(err); }
    });
};

// Delete AAD
const deleteAADByID = (req, res, next) => {
  AAD.findById(req.params.aadId)
    .orFail()
    .then((currentAAD) => {
      if (!currentAAD) { return next(new NotFoundError('AAD not found')); }
      return AAD.findByIdAndDelete(req.params.aadId)
        .orFail(() => new NotFoundError('AAD not found'))
        .then(() => { res.send({ message: 'AAD deleted' }); });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        // res.status(404).send({ error: 'not correct ID passed' });
        next(new BadRequestError('not correct ID passed'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        // res.status(404).send({ error: 'Rig not found' });
        next(new NotFoundError('AAD not found'));
      } else { next(err); }
    });
};

module.exports = {
  getAADsList, createAAD, updateAADInfo, deleteAADByID,
};
