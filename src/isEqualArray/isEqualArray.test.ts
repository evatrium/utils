import { describe, it, expect } from "vitest";
import { isEqualArray } from '~/isEqualArray';

describe("isEqualArray", () => {
	it("should return true if the array1 the same items in the same order as array2", () => {
		expect(isEqualArray(["a", "b", "c"], ["a", "b", "c"])).toBeTruthy();
		expect(isEqualArray([], [])).toBeTruthy();
	});
	it("should return false if the array1 does not have the items in array2 with same order", () => {
		expect(isEqualArray([], ["a", "b", "d"])).toBeFalsy();
		expect(isEqualArray(["a", "b", "c"], ["a", "b", "c", "d"])).toBeFalsy();
		expect(isEqualArray(["a", "b", "c"], ["a", "c", "b"])).toBeFalsy();
	});
});
