import React from 'react';
import Key from './Key';
import './Keyboard.css';
import { keys } from '../constants';

/**
 * Keyboard Component
 *
 * (It's just a bunch of Keys.)
 */
export default function Keyboard() {
	return (
		<article className="keyboard">
			{keys.map((key, idx) => (
				<Key key={idx} {...key} />
			))}
		</article>
	);
}
