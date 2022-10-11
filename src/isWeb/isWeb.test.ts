import { describe, it, expect } from 'vitest';
import { isWeb } from '~/isWeb';

describe('isWeb', () => {
	it('returns expected output', () => {
		const result = isWeb;
		const expected = true; // cuz we have jsdom
		expect(result).toMatchObject(expected);
	});
});
