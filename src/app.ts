import {readFileSync} from 'fs';
import * as path from 'path';
import analytics from './analytics';

export default () => {
  const file = path.join(__dirname, '../data.txt');
  const buffer = readFileSync(file, { encoding: 'utf8'});
  const data = buffer.toString();
  console.log(analytics.evaluateLogFile(data));
}
