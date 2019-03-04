import React from 'react';
import Screen from './screen/Screen';
import Keyboard from './keyboard/Keyboard';
import InputContext from './InputContext';
import './App.css';

export default function() {
	const [input, setInput] = React.useState('');

	return (
		<InputContext.Provider value={[input, setInput]}>
			<main>
				<Screen />
				<Keyboard />
			</main>
		</InputContext.Provider>
	);
}
