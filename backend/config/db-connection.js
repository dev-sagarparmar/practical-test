import bluebird from 'bluebird';
import pgp from 'pg-promise';
import monitor from 'pg-monitor';
import {
  DEBUG_SQL,
  DB,
} from './env-var';

const options = {
  capSQL: true,
  promiseLib: bluebird,
};

if (DEBUG_SQL === true || DEBUG_SQL === 'true') {
  monitor.attach(options);
  monitor.setTheme('matrix');
}

export const pgpHandler = pgp(options);
export default pgpHandler(DB);
