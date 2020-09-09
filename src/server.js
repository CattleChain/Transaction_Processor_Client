import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import { Transactions } from './model/transaction';
const routes = require('./routes/index');
const { config } = require('./config');



const api = express();

api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use('/', routes);

api.listen(config.port, err => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`API is now running on port ${config.port} in ${config.env} mode`);
});


module.exports = api;
