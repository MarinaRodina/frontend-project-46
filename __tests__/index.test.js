import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(filepath, 'utf8');

test('genDiff - compare JSON files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual(readFile(getFixturePath('expected_files.txt')));
});

test('genDiff - compare YML files', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')))
    .toEqual(readFile(getFixturePath('expected_files.txt')));
});

test('genDiff - nested JSON files stylish', () => {
  expect(genDiff(getFixturePath('file3.json'), getFixturePath('file4.json')))
    .toEqual(readFile(getFixturePath('expected_files_stylish.txt')));
});

test('genDiff - nested YML files stylish', () => {
  expect(genDiff(getFixturePath('file3.yaml'), getFixturePath('file4.yaml')))
    .toEqual(readFile(getFixturePath('expected_files_stylish.txt')));
});
