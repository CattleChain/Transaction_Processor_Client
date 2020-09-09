const { Transactions } = require('../model/transaction');
const HttpStatus = require('http-status-codes');
const { config } = require('../config/index');

class TransactionHandlerController {

    async getAllTransactions(request, response, next) {
        if (config.db_sync == 'true') {
            Transactions.findAll().then((result) => {
                return response.status(HttpStatus.OK).send({ result: result });
            }).catch((err) => {
                return response.status(HttpStatus.BAD_REQUEST).send({ error: err });
            })
        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'DB Sync is not enabled' });
        }

    }

    async getTransactionById(request, response, next) {
        if (config.db_sync == 'true') {
            if (request.params.id === null || request.params.id === '') {
                return response.status(HttpStatus.BAD_REQUEST).send({ error: 'param id is missing' });
            }
            Transactions.findOne({ where: { id: request.params.id } }).then((result) => {
                return response.status(HttpStatus.OK).send({ result: result });
            }).catch((err) => {
                return response.status(HttpStatus.BAD_REQUEST).send({ error: err });
            })

        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'DB Sync is not enabled' });
        }
    }
}

export default new TransactionHandlerController();