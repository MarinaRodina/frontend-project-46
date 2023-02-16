import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(filepath, 'utf8');

const tests = [
  {
    filename1: 'file3.json', filename2: 'file4.json', expected: 'expected_files_stylish.txt',
  },
  {
    filename1: 'file3.yaml', filename2: 'file4.yaml', expected: 'expected_files_stylish.txt',
  },
  {
    filename1: 'file3.json', filename2: 'file4.json', expected: 'expected_files_stylish.txt', format: 'stylish',
  },
  {
    filename1: 'file3.yaml', filename2: 'file4.yaml', expected: 'expected_files_stylish.txt', format: 'stylish',
  },
  {
    filename1: 'file3.json', filename2: 'file4.json', expected: 'expected_files_plain.txt', format: 'plain',
  },
  {
    filename1: 'file3.yaml', filename2: 'file4.yaml', expected: 'expected_files_plain.txt', format: 'plain',
  },
  {
    filename1: 'file3.json', filename2: 'file4.json', expected: 'expected_files_json.txt', format: 'json',
  },
  {
    filename1: 'file3.yaml', filename2: 'file4.yaml', expected: 'expected_files_json.txt', format: 'json',
  },
];

test.each(tests)('gendiff %s', ({
  filename1, filename2, expected, format,
}) => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  const expectedResult = readFile(getFixturePath(expected));
  expect(genDiff(filepath1, filepath2, format)).toEqual(expectedResult);
});
