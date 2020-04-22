'use strict';

const { CreateAnimalIdentity, AddAnimalEvent, status } = require('../controllers/index');
const { wrapAsync } = require('../utils/index');

module.exports = api => {
  api.route('/status').get(wrapAsync(status));
  api.route('/create').post(wrapAsync(CreateAnimalIdentity));
  api.route('/add').post(wrapAsync(AddAnimalEvent));
};