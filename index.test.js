const { createIndex, match } = require('./index');

describe('#createIndex', () => {
	test('should create a simple index', async () => {
		const result = createIndex('./fixtures/sample.txt');
		expect(result).toMatchSnapshot();
	});
});

describe('#match', () => {
	test('should find items that are indexed', async () => {
		const index = require('./fixtures/index.json');
		expect(match('edo', index)).toMatchSnapshot();
	});
	
	test('should be case insensitive', async () => {
		const index = require('./fixtures/index.json');
		const result = match('EDO', index);
		expect(result).not.toBe(undefined);
		expect(result).toMatchSnapshot();
	});
	
	test('should return undefined if the input is not found in the dictionary', async () => {
		const index = require('./fixtures/index.json');
		expect(match('not-in-dictionary', index)).toBe(undefined);
	});
});