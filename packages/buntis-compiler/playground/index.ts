import * as buntis from 'buntis';
import { readFile } from '../../../src/utils/utils';

const data = readFile(__dirname + '/sample.tsx');
const res = buntis.parseTSModule(data, {
  next: true,
  loc: true,
  jsx: true,
});
console.log(JSON.stringify(res, null, 2));
