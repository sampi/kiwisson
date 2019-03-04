import React from 'react';
import InputContext from '../InputContext';
import './Key.css';

export default function({ label, subtitle, special }) {
	const [input, setInput] = React.useContext(InputContext);
	return (
		<button
			className="key"
			onClick={() => {
				window.navigator.vibrate(5);
				setInput(
					special === 'delete'
						? /([0-9]?[*]*$)/[Symbol.replace](input, '')
						: input + label
				);
			}}
		>
			<figure>
				<p>{label}</p>
				{subtitle && <figcaption>{subtitle}</figcaption>}
			</figure>
		</button>
	);
}
