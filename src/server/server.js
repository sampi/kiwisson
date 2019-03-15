import { keys } from '../constants';

/**
 * Available dictionary of words,
 * key - word
 * value - frequency of use in English
 * @type {Map<String, Number>}
 */
let wordMap = new Map();
// Build Map of words and frequencies
import(/* webpackChunkName: "words" */ './words').then(({ words }) =>
	words.forEach((word, frequency) => wordMap.set(word, frequency))
);

/**
 * Process a single word
 * Find matches in the dictionary and return one match,
 * If there are no matches, return the input
 * @param  {String} rawInput Raw input, including * characters
 * @return {String}          Processed word
 */
function processWord(rawInput = '') {
	// Normalize input by removing all * characters
	const input = rawInput.split('*').join('');

	// Find matching words from the dictionary
	const output =
		// Split input in an Array of numbers
		input
			.split('')
			// Map each number to an Array of letters
			.map(
				num =>
					(num = parseInt(num, 10)) &&
					num >= 2 &&
					num <= 9 &&
					keys[num - 1].subtitle.split('')
			)
			// Filter out empty elements
			.filter(Boolean)
			// Find all possible permutations of each Array of letters
			// by reducing all possible letters to be added to all of the words
			.reduce(
				(possibleWords, currentLetters) =>
					possibleWords.reduce(
						(combinations, currentLetter) =>
							currentLetters
								.map(letter => currentLetter + letter)
								.concat(combinations),
						[]
					),
				['']
			)
			// Filter out words that aren't in the dictionary
			.filter(possibleMatch => wordMap.has(possibleMatch))
			// Sort them based on frequency
			.sort((a, b) => wordMap.get(a) - wordMap.get(b));

	// If there aren't any matches, return the input string
	if (!output.length) {
		return input;
	}

	// Find the number of trailing * characters
	const stars = /[0-9]+([*]*)$/gi.exec(rawInput)[1].length;

	// Return the matched word,
	// or alternative match
	return output[stars % output.length];
}

/**
 * Turn a string of numbers and *'s into words
 * @param  {String} input Input numbers and *'s
 * @return {String}       Output words
 */
export function numsToText(input = '') {
	try {
		return input
			.split('0')
			.map(inWord => processWord(inWord))
			.join(' ');
	} catch (e) {
		console.error(e);
		return '';
	}
}
