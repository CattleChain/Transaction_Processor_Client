const { createHash } = require('crypto');
const HttpStatus = require('http-status-codes');
const { config } = require('../config');

const createAccount = async (req,  res)  => {
	const legalId = req.body.legalId;
	if(legalId ===  null || legalId === '') {
		res.status(HttpStatus.BAD_REQUEST).send({success: 'id is missing'});
	}
    const _hash = createHash('sha512').update(legalId).digest('hex').toLowerCase().substring(0, 64);
    const account = config.family_namespace + _hash;
    res.status(HttpStatus.OK).send({'account': account});
}

module.exports = {
    createAccount,
}