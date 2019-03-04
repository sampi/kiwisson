import { keys } from '../constants';

let words = [];
fetch('words.txt')
	.then(res => res.text())
	.then(text => (words = text.split('\n')));

function processWord(rawInput) {
	const input = rawInput.split('*').join('');

	const re = new RegExp(
		`^${input
			.split('')
			.map(num => num >= 2 && num <= 9 && `[${keys[num - 1].subtitle}]`)
			.join('')}$`,
		'i'
	);

	const output = words
		.filter(w => w.length === input.length)
		.filter(w => re.test(w));

	if (!output.length) {
		return input;
	}

	return output[(rawInput.split('*').length - 1) % output.length];
}

export default function(input) {
	return input
		.split('0')
		.map(inWord => processWord(inWord))
		.join(' ');
}
