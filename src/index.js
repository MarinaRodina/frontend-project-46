import { readFileSync } from 'fs';
import path from 'path';
import parsers from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(filepath, 'utf8');

const getExtension = (fileName) => path.extname(fileName).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(getAbsolutePath(filepath1));
  const data2 = readFile(getAbsolutePath(filepath2));

  const parsedData1 = parsers(data1, getExtension(filepath1));
  const parsedData2 = parsers(data2, getExtension(filepath2));

  const diffTree = buildTree(parsedData1, parsedData2);

  return format(diffTree, formatName);
};

export default genDiff;
