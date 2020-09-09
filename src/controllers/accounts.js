const { createHash } = require('crypto');
const HttpStatus = require('http-status-codes');
const { config } = require('../config');

class AccountHandlerController {


    async createAccount(request, response, next) {
        const legalId = request.body.legalId;
        if (legalId === null || legalId === '') {
            return response.status(HttpStatus.BAD_REQUEST).send({ success: 'id is missing' });
        }
        const _hash = createHash('sha512').update(legalId).digest('hex').toLowerCase().substring(0, 64);
        const account = config.family_namespace + _hash;
        return response.status(HttpStatus.OK).send({ 'account': account });

    }
}

export default new AccountHandlerController();