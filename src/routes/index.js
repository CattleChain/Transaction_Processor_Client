import express from 'express';
import NotificationHandlerController from '../controllers/notify';
import AnimalController from '../controllers/animal';
import AccountHandlerController from '../controllers/accounts';
import TransactionHandlerController from '../controllers/transactions';

const router = express.Router();

router.get('/version', NotificationHandlerController.getVerionHandler.bind(NotificationHandlerController));

router.post('/notify', NotificationHandlerController.notificationHandler.bind(NotificationHandlerController));

router.post('/CreateAnimalIdentity', AnimalController.CreateAnimalIdentityRequest.bind(AnimalController));

router.post('/account', AccountHandlerController.createAccount.bind(AccountHandlerController));

router.get('/transactions', TransactionHandlerController.getAllTransactions.bind(TransactionHandlerController));
router.get('/transaction/:id', TransactionHandlerController.getTransactionById.bind(TransactionHandlerController));

module.exports = router;
