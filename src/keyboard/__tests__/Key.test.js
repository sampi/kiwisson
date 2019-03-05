import React from 'react';
import ReactDOM from 'react-dom';
import Key, { handleClick } from '../Key';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Key label="label" subtitle="subtitle" />, div);
	ReactDOM.unmountComponentAtNode(div);
});

describe('handleClick', () => {
	const setInput = jest.fn(() => {});
	it("appends the pressed key's label to the input when clicked", () => {
		handleClick('', setInput, '3');
		expect(setInput.mock.calls.length).toBe(1);
		expect(setInput.mock.calls[0][0]).toBe('3');
		setInput.mockClear();

		handleClick('22', setInput, '3');
		expect(setInput.mock.calls.length).toBe(1);
		expect(setInput.mock.calls[0][0]).toBe('223');
		setInput.mockClear();
	});

	it('deletes up to the last number when the delete key is pressed', () => {
		handleClick('22', setInput, '', 'delete');
		expect(setInput.mock.calls.length).toBe(1);
		expect(setInput.mock.calls[0][0]).toBe('2');
		setInput.mockClear();

		handleClick('22**', setInput, '', 'delete');
		expect(setInput.mock.calls.length).toBe(1);
		expect(setInput.mock.calls[0][0]).toBe('2');
		setInput.mockClear();

		handleClick('2*2****', setInput, '', 'delete');
		expect(setInput.mock.calls.length).toBe(1);
		expect(setInput.mock.calls[0][0]).toBe('2*');
		setInput.mockClear();

		handleClick('2*02****', setInput, '', 'delete');
		expect(setInput.mock.calls.length).toBe(1);
		expect(setInput.mock.calls[0][0]).toBe('2*0');
		setInput.mockClear();

		handleClick('2*00', setInput, '', 'delete');
		expect(setInput.mock.calls.length).toBe(1);
		expect(setInput.mock.calls[0][0]).toBe('2*0');
		setInput.mockClear();
	});
});
