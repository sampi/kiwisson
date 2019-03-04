import React from 'react';
import Key from './Key';
import './Keyboard.css';
import { keys } from '../constants';

export default () => (
	<article className="keyboard">
		{keys.map((key, idx) => (
			<Key key={idx} {...key} />
		))}
	</article>
);
