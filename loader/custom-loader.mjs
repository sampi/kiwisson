// This is a custom loader that allows .js files to be parsed as ES Modules in NodeJS
// @see https://nodejs.org/docs/latest-v10.x/api/esm.html

import path from 'path';
import process from 'process';
import Module from 'module';

const builtins = Module.builtinModules;
const JS_EXTENSIONS = new Set(['.js', '.mjs']);
const DEFAULT_EXTENSION = '.js';

const baseURL = new URL('file://');
baseURL.pathname = `${process.cwd()}/`;

export function resolve(specifier, parentModuleURL = baseURL, defaultResolve) {
	if (builtins.includes(specifier)) {
		return {
			url: specifier,
			format: 'builtin'
		};
	}
	if (
		/^\.{0,2}[/]/.test(specifier) !== true &&
		!specifier.startsWith('file:')
	) {
		// For node_modules support:
		// return defaultResolve(specifier, parentModuleURL);
		throw new Error(
			`imports must begin with '/', './', or '../'; '${specifier}' does not`
		);
	}
	let resolved = new URL(specifier, parentModuleURL);
	let ext = path.extname(resolved.pathname);
	// If there is no extension specified, we try '.js' as the default
	if (!ext) {
		resolved = new URL(`${specifier}${DEFAULT_EXTENSION}`, parentModuleURL);
		ext = path.extname(resolved.pathname);
	}
	if (!JS_EXTENSIONS.has(ext)) {
		throw new Error(
			`Cannot load file with non-JavaScript file extension ${ext}.`
		);
	}
	return {
		url: resolved.href,
		format: 'esm'
	};
}
