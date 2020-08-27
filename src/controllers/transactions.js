const { Transactions } = require('../model/transaction');
const HttpStatus = require('http-status-codes');

const getAllTransactions = async (req,  res)  => {
    Transactions.findAll().then((result) => {
        res.status(HttpStatus.OK).send({ result : result});
    }).catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).send({error: err});
    })
}

const getTranactionById = async (req,  res)  => {
    if(req.params.id === null || req.params.id === '') {
        res.status(HttpStatus.BAD_REQUEST).send({error: 'param id is missing'}); 
    }
    Transactions.findOne({where: {id: req.params.id}}).then((result) => {
        res.status(HttpStatus.OK).send({ result : result});
    }).catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).send({error: err});
    })
}

module.exports = {
    getAllTransactions,
    getTranactionById,
} 