import dotenv from 'dotenv';
import development from './development';
import production from './production';

dotenv.config();
const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';
let currentEnv = development;

if (isProduction) {
	currentEnv = production;
}

export default currentEnv;
