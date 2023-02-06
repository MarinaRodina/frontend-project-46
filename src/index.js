import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parsers from './parsers.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(filepath, 'utf8');

const getExtension = (fileName) => path.extname(fileName).slice(1);

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(getAbsolutePath(filepath1));
  const data2 = readFile(getAbsolutePath(filepath2));
  const obj1 = parsers(data1, getExtension(filepath1));
  const obj2 = parsers(data2, getExtension(filepath2));

  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keysUnion = _.union(key1, key2);
  const keysSort = _.sortBy(keysUnion);

  const callback = (key) => {
    const hasValue1 = Object.hasOwn(obj1, key);
    const hasValue2 = Object.hasOwn(obj2, key);
    const indent = ' '.repeat(2);
    if (!hasValue1) {
      return `${indent}+ ${key}: ${obj2[key]}`;
    } if (!hasValue2) {
      return `${indent}- ${key}: ${obj1[key]}`;
    } if (obj1[key] === obj2[key]) {
      return `${indent}${indent}${key}: ${obj1[key]}`;
    } return `${indent}- ${key}: ${obj1[key]}\n${indent}+ ${key}: ${obj2[key]}`;
  };

  const array = keysSort.map(callback);
  const result = ['{', ...array, '}'].join('\n');
  return result;
};

export default genDiff;
