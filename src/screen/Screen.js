import React from 'react';
import InputContext from '../InputContext';
import getWords from './server';
import './Screen.css';

export default function() {
	const [input] = React.useContext(InputContext);
	const [output, setOutput] = React.useState('');

	React.useEffect(() => {
		const words = getWords(input);
		setOutput(words);
	}, [input]);
	return (
		<section className="screen">
			<figure>{output}</figure>
		</section>
	);
}
