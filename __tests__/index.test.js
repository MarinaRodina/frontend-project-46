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
    file1: 'file1.json', file2: 'file2.json', expected: 'expected_files.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', expected: 'expected_files.txt',
  },
  {
    file1: 'file3.json', file2: 'file4.json', expected: 'expected_files_stylish.txt',
  },
  {
    file1: 'file3.yaml', file2: 'file4.yaml', expected: 'expected_files_stylish.txt',
  },
  {
    file1: 'file3.json', file2: 'file4.json', expected: 'expected_files_stylish.txt', format: 'stylish',
  },
  {
    file1: 'file3.yaml', file2: 'file4.yaml', expected: 'expected_files_stylish.txt', format: 'stylish',
  },
  {
    file1: 'file3.json', file2: 'file4.json', expected: 'expected_files_plain.txt', format: 'plain',
  },
  {
    file1: 'file3.yaml', file2: 'file4.yaml', expected: 'expected_files_plain.txt', format: 'plain',
  },
  {
    file1: 'file3.json', file2: 'file4.json', expected: 'expected_files_json.txt', format: 'json',
  },
  {
    file1: 'file3.yaml', file2: 'file4.yaml', expected: 'expected_files_json.txt', format: 'json',
  },
];

test.each(tests)('gendiff %s', ({
  file1, file2, expected, format,
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expectedResult = readFile(getFixturePath(expected));
  expect(genDiff(filepath1, filepath2, format)).toEqual(expectedResult);
});
