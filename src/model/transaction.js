const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME || 'cattlechain';
const DB_USERNAME = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';

global.db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'postgres' 
  });

var Transactions = global.db.define('transactions', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true ,
        allowNull:false
    },
    txhash: {
        type: Sequelize.TEXT
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  });

module.exports = {
    Transactions: Transactions
};

global.db.authenticate().then(() => {
    console.log('Connection to database could be established successfully.');
    global.db.sync().then(() => {
        console.log('db sync');        
    })
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});