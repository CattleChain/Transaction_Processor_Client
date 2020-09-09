const { Sequelize } = require('sequelize');
const { config } = require('../config/index');

// if db sync enabled
if (config.db_sync == 'true') {
    // db connection
    global.db = new Sequelize(config.db_name, config.db_username, config.db_password, {
        host: config.db_host,
        dialect: config.db_dialect
    });

    var Transactions = global.db.define('transactions', {
        id: {
            type: Sequelize.TEXT,
            primaryKey: true,
            allowNull: false
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
}