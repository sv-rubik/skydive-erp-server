const aadsRouter = require('express').Router();

const {
  getAADsList, createAAD, updateAADInfo, deleteAADByID,
} = require('../controllers/aadsControllers');

aadsRouter.get('/', getAADsList); // request to http://localhost:5000/aads
aadsRouter.post('/', createAAD); // request to http://localhost:5000/aads
aadsRouter.patch('/:aadId', updateAADInfo); // request to http://localhost:5000/aads/1
aadsRouter.delete('/:aadId', deleteAADByID); // request to http://localhost:5000/aads/1

module.exports = aadsRouter;
