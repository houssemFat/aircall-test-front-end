import { default as Common } from './common.fr';
import { default as Errors } from './errors.fr';
import { default as Calls } from './calls.fr';

const messages = {...Common, ...Errors, ...Calls};
export default messages;
