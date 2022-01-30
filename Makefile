install:
	npm ci

develop:
	npx webpack server

build:
	rm -rf dist && NODE_ENV=production npx webpack

