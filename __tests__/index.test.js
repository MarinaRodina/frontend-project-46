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
    .toEqual(readFile(getFixturePath('expected_files_JSON.txt')));
});

test('genDiff - compare YML files', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')))
    .toEqual(readFile(getFixturePath('expected_files_yml.txt')));
});
