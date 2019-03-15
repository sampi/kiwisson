import { keys } from '../constants';

/**
 * Available dictionary of words
 * @type {Array<String>}
 */
let wordMap = [];
// Split the words module into a separate chunk
import(/* webpackChunkName: "words" */ './words').then(
	({ words }) => (wordMap = words.split('\n'))
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

	// Construct RegExp to find matching words
	const re = new RegExp(
		// Start matching at the beginning of the string (^)
		`^${input
			// Split string to an array of characters
			.split('')
			// Only process numbers between 2...9
			.map(
				num =>
					(num = parseInt(num, 10)) &&
					num >= 2 &&
					num <= 9 &&
					`[${keys[num - 1].subtitle}]`
			)
			// Discard empty elements
			.filter(Boolean)
			// Join array to be a string
			// Stop matching at the end of the string ($)
			.join('')}$`,
		'i'
	);

	// Find matching words from the dictionary
	const output = wordMap
		// For a minimal performance gain,
		// Filter out any words that aren't
		// the same length as the input
		.filter(w => w.length === input.length)
		// Match the remaining words against the RegExp
		.filter(w => re.test(w));

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
