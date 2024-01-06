const rigsRouter = require('express').Router();

const {
  getRigsList, createRig, updateRigInfo, deleteRigByID,
} = require('../controllers/rigsControllers');

rigsRouter.get('/', getRigsList); // request to http://localhost:5000/rigs
rigsRouter.post('/', createRig); // request to http://localhost:5000/rigs
rigsRouter.patch('/:rigId', updateRigInfo); // request to http://localhost:5000/rigs/1
rigsRouter.delete('/:rigId', deleteRigByID); // request to http://localhost:5000/rigs/1

module.exports = rigsRouter;
