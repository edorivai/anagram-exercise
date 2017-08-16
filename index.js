const fs = require('fs');

function getSortedLetters(word) {
	return word.split('').sort().join('');
}

/**
 * 
 * @param fileName
 * @returns {{}}
 */
function createIndex(fileName) {
	const rawDict = fs.readFileSync(fileName, 'utf8');
	const words = rawDict.split('\n');
	
	const index = {};
	words.forEach(w => {
		const sortedLetters = getSortedLetters(w);
		
		index[sortedLetters] = index[sortedLetters] || [];
		index[sortedLetters].push(w);
	});
	
	return index;
}

function match(input, index) {
	// console.time('lookup');
	const matches = index[getSortedLetters(input)];
	// console.timeEnd('lookup');
	return matches;
}

if (!module.parent) {
	const input = process.argv[2];
	const index = createIndex('./wordlist.txt');
	const matches = match(input, index);
	
	if (!matches) {
		console.log(`"${input}" not found in dictionary`);
	} else {
		console.log(matches.join('\n'));
	}
}

module.exports = {
	createIndex,
	match,
};