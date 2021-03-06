import React from 'react';
import InputContext from '../InputContext';
import './Screen.css';

/**
 * Screen Component
 *
 * This Component consumes the InputContext using Hooks.
 * The backend would be hooked up here.
 */
export default function Screen() {
	const [input] = React.useContext(InputContext);
	const [output, setOutput] = React.useState('');

	React.useEffect(() => {
		// Split the "server" into a separate chunk
		import(/* webpackChunkName: "server" */ '../server/server')
			.then(({ numsToText }) => setOutput(numsToText(input)))
			.catch(e => console.error(e));
	}, [input]);
	return (
		<section className="screen">
			<figure>{output}</figure>
		</section>
	);
}
