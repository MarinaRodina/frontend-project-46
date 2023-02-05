install:
	npm ci
publish:
	npm publish --dry-run
gendiff -h:
	node bin/gendiff.js
lint:
	npx eslint .
test:
	npx jest
test-coverage:
	npx jest --coverage		
