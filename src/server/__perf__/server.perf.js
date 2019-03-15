import { performance } from 'perf_hooks';
import { numsToText } from '../server';

const NUM_LOOKUPS = 100000;
const startTime = performance.now();
for (let i = NUM_LOOKUPS; i > 0; i--) {
	numsToText('4***6*63*');
}
const duration = performance.now() - startTime;
console.log(`${NUM_LOOKUPS} lookups took ${duration} ms`);
