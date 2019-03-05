import { numsToText } from '../server';

it('handles empty input', () => {
	expect(numsToText()).toEqual('');
	expect(numsToText('')).toEqual('');
});

it('handles invalid input type', () => {
	const systemConsoleError = global.console.error;
	global.console.error = jest.fn(() => {});

	expect(numsToText({ not: 'valid' })).toEqual('');
	expect(global.console.error.mock.calls.length).toBe(1);
	global.console.error.mockClear();

	expect(numsToText(['not', 'valid'])).toEqual('');
	expect(global.console.error.mock.calls.length).toBe(1);
	global.console.error.mockClear();

	expect(numsToText(numsToText)).toEqual('');
	expect(global.console.error.mock.calls.length).toBe(1);
	global.console.error.mockClear();

	global.console.error = systemConsoleError;
});

it('handles invalid input characters', () => {
	expect(numsToText('abcd')).toEqual('abcd');
	expect(numsToText('abcd1')).toEqual('abcd1');
});

it('converts numbers to words', () => {
	expect(numsToText('8378464')).toEqual('testing');
	expect(numsToText('47')).toEqual('is');
	expect(numsToText('9675464')).toEqual('working');
});

it('returns alternative matches if * is appended to the input', () => {
	expect(numsToText('4663')).toEqual('home');
	expect(numsToText('4663*')).toEqual('good');
	expect(numsToText('4663**')).toEqual('gone');
	expect(numsToText('4663***')).toEqual('hood');
	expect(numsToText('4663****')).toEqual('home');
});

it('ignores invalid * characters in the middle of a word', () => {
	expect(numsToText('46*63')).toEqual('home');
	expect(numsToText('4***6*63')).toEqual('home');
	expect(numsToText('4***6*63*')).toEqual('good');
});
