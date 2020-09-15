const dotenv = require('dotenv');
const development = require('./development');
const production = require('./production');

dotenv.config();
const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';
let currentEnv = development;

if (isProduction) {
	currentEnv = production;
}

module.exports = currentEnv;
