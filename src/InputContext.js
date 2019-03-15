import React from 'react';

/**
 * InputContext
 * The current raw input of numbers and *'s
 * is stored and modified in this Context.
 *
 * Tuple format:
 * [0] - input
 * [1] - setInput
 */
export default React.createContext(['', () => {}]);
