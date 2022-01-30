install:
	npm ci

develop:
	npx webpack server

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint .

test:
	npm test

