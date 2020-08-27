const { CreateAnimalIdentity, AddAnimalEvent, status } = require('../controllers/index');
const { wrapAsync } = require('../utils/index');
const { createAccount } = require('../controllers/accounts');
const { getAllTransactions, getTranactionById } = require('../controllers/transactions');


module.exports = api => {
api.route('/status').get(wrapAsync(status));
api.route('/account').post(wrapAsync(createAccount));
api.route('/create').post(wrapAsync(CreateAnimalIdentity));
api.route('/transactions').get(wrapAsync(getAllTransactions));
api.route('/transactions/:id').get(wrapAsync(getTranactionById));
// api.route('/add').post(wrapAsync(AddAnimalEvent));
};
