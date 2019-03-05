import React from 'react';
import InputContext from '../InputContext';
import './Key.css';

/**
 * Handle tap/click on Key
 * If the DELETE key is pressed:
 *   remove all trailing *'s and the last number
 * @param  {String}   input    Current input in the React Context
 * @param  {Function} setInput React Context Hook setter
 * @param  {String}   label    Label of the button pressed
 * @param  {=String}  special  Special function of the button pressed
 */
export function handleClick(
	input = '',
	setInput = () => {},
	label = '',
	special = ''
) {
	if (
		global.window &&
		global.window.navigator &&
		global.window.navigator.vibrate &&
		typeof global.window.navigator.vibrate === 'function'
	) {
		global.window.navigator.vibrate(5);
	}
	setInput(
		special === 'delete' ? input.replace(/([0-9]?[*]*$)/, '') : input + label
	);
}

/**
 * Key Component
 * @param  {String}  props.label    Label of the Key
 * @param  {=String} props.subtitle Subtitle of the Key
 * @param  {=String} props.special  Special function of the key
 */
export default function({ label = '', subtitle = '', special = '' }) {
	const [input, setInput] = React.useContext(InputContext);
	return (
		<button
			className="key"
			onClick={() => handleClick(input, setInput, label, special)}
		>
			<figure>
				<p>{label}</p>
				{subtitle && <figcaption>{subtitle}</figcaption>}
			</figure>
		</button>
	);
}
