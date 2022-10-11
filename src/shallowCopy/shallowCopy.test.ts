import { describe, it, expect } from 'vitest';
import { shallowCopy } from '~/shallowCopy';

describe('shallowCopy', () => {
	it('should make a shallow copy of an obj/array ', () => {
		const obj = { foo: 'baz', bing: 'boo' };
		const objResult = shallowCopy(obj);
		expect(objResult).toMatchObject(obj);
		expect(objResult === obj).toBeFalsy();

		const arr = ['foo', 'bar'];
		const arrResult = shallowCopy(arr);
		expect(arrResult).toMatchObject(arr);
		expect(arr === arrResult).toBeFalsy();
	});
});
