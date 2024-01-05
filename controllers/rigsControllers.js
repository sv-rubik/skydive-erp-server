// Import Rig model made by rigSchema
const mongoose = require('mongoose');
const Rig = require('../models/rigs');

const BadRequestError = require('../utils/errors/BadRequestError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError'); // 404

// Get the list of Rigs
const getRigsList = (req, res, next) => {
  Rig.find({})
    .then((rigsList) => res.status(200).send(rigsList))
    .catch((err) => next(err));
};

// Create new Rig
const createRig = (req, res, next) => {
  const rigData = req.body;
  Rig.create(rigData)
    .then((rigData) => res.status(201).send(rigData))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Not correct data passed'));
      } else { next(err); }
    });
};

// Update Rig info by Rig Number
const updateRigInfo = (req, res, next) => {
  const rigData = req.body;
  Rig.findOneAndUpdate({rigNumber: rigData.rigNumber}, rigData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((updatedRigData) => res.status(200).send(updatedRigData))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Not correct data passed'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Rig not found'));
      } else { next(err); }
    });
};

// Delete Rig
const deleteRigByID = (req, res, next) => {
  Rig.findById(req.params.rigId)
    .orFail()
    .then((currentRig) => {
      if (!currentRig) { return next(new NotFoundError('Rig not found')); }
      return Rig.findByIdAndDelete(req.params.rigId)
        .orFail(() => new NotFoundError('Rig not found'))
        .then(() => { res.send({ message: 'Rig deleted' }); });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        // res.status(404).send({ error: 'not correct ID passed' });
        next(new BadRequestError('not correct ID passed'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        // res.status(404).send({ error: 'Rig not found' });
        next(new NotFoundError('Rig not found'));
      } else { next(err); }
    });
};

module.exports = {
  getRigsList, createRig, updateRigInfo, deleteRigByID,
};
