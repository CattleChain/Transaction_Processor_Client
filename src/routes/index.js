const { CreateAnimalIdentity, AddAnimalEvent, status } = require('../controllers/index');
const { wrapAsync } = require('../utils/index');
const { createAccount } = require('../controllers/accounts');


module.exports = api => {
api.route('/status').get(wrapAsync(status));
api.route('/account').post(wrapAsync(createAccount));
api.route('/create').post(wrapAsync(CreateAnimalIdentity));
api.route('/add').post(wrapAsync(AddAnimalEvent));
};
