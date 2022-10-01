import { describe, it, expect } from "vitest";
import {
	hasKeys,
	isEmpty,
	includesAll,
	isEqualArray,
	propsChanged,
	fixedPropsChanged,
	shallowEqual,
	isEqual
} from "../src";

describe("hasKeys", () => {

	it("should return true when an object or function has keys", () => {

		expect(hasKeys({ foo: "bar" })).toBeTruthy();
		const func = () => 0;
		func.foo = "bar";
		expect(hasKeys(func)).toBeTruthy();
	});

	it("should return false when an object is empty or function has no keys", () => {

		expect(hasKeys({})).toBeFalsy();
		const func = () => 0;
		expect(hasKeys(func)).toBeFalsy();
	});

});

describe("isEmpty", () => {

	it("should return true when a data structure is empty or function has no keys", () => {
		expect(isEmpty({})).toBeTruthy();
		expect(isEmpty([])).toBeTruthy();
		expect(isEmpty(new Map())).toBeTruthy();
		expect(isEmpty(new Set())).toBeTruthy();
		expect(isEmpty(() => 0)).toBeTruthy();
	});

	it("should return false when a data structure is not empty or function has keys", () => {
		expect(isEmpty({ foo: "bar" })).toBeFalsy();
		expect(isEmpty(["foo"])).toBeFalsy();
		expect(isEmpty(new Map([["foo", "bar"]]))).toBeFalsy();
		expect(isEmpty(new Set(["foo"]))).toBeFalsy();
		const func = () => 0;
		func.foo = "bar";
		expect(isEmpty(func)).toBeFalsy();
	});

	it("should return true when a falsy value is provided", () => {
		expect(isEmpty(undefined)).toBeTruthy();
		expect(isEmpty(null)).toBeTruthy();
		expect(isEmpty(false)).toBeTruthy();
		expect(isEmpty(0)).toBeTruthy();
		expect(isEmpty(void 0)).toBeTruthy();
	});

	it("should return false when a truthy value is provided", () => {
		expect(isEmpty(1)).toBeFalsy();
		expect(isEmpty(-1)).toBeFalsy();
		expect(isEmpty("foo")).toBeFalsy();
		expect(isEmpty("false")).toBeFalsy();
		expect(isEmpty(true)).toBeFalsy();
	});

});


describe("includesAll", () => {
	it("should return true if the array1 includes all items from array2", () => {
		expect(includesAll(["a", "b", "c"], ["a", "b", "c"])).toBeTruthy();
		expect(includesAll(["a", "b", "c"], ["a", "c", "b"])).toBeTruthy();
		expect(includesAll(["a", "b", "c", "d"], ["a", "c", "b"])).toBeTruthy();
		expect(includesAll(["a", "b", "c"], [])).toBeTruthy();
	});
	it("should return false if the array1 does not have all items from array2", () => {
		expect(includesAll(["a", "b", "c"], ["a", "b", "c", "d"])).toBeFalsy();
		expect(includesAll(["a", "b", "c"], ["a", "b", "d"])).toBeFalsy();
		expect(includesAll([], ["a", "b", "d"])).toBeFalsy();
	});
});

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

describe("fixedPropsChanged", () => {
	it("should return true when values change on an object", () => {
		expect(fixedPropsChanged({ a: 1, b: 2 }, { a: 1, b: 4 })).toBeTruthy();
		expect(fixedPropsChanged({ a: 1, b: 2 }, { a: 1, b: 3 })).toBeTruthy();
	});
	it("should return false when values are the same '===' ", () => {
		expect(fixedPropsChanged({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeFalsy();
		expect(fixedPropsChanged({}, {})).toBeFalsy();
	});
});

describe("propsChanged", () => {
	const comparator = propsChanged;
	it("should return true when values change on an object or number of keys change", () => {

		// values change
		expect(comparator({ a: 1, b: 2 }, { a: 1, b: 4 })).toBeTruthy();
		expect(comparator({ a: "1", b: "2" }, { a: "3", b: "4" })).toBeTruthy();
		expect(comparator({ a: true, b: true }, { a: false, b: true })).toBeTruthy();
		expect(comparator({ a: true, b: true }, { a: false, b: 1 })).toBeTruthy();
		// keys added
		expect(comparator({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBeTruthy();
		// keys removed
		expect(comparator({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBeTruthy();
		// empty objects
		expect(comparator({}, { a: 1, b: 2 })).toBeTruthy();
		expect(comparator({ a: 1, b: 2 }, {})).toBeTruthy();
	});
	it("should return false when values are the same '===' and same number of keys", () => {
		expect(comparator({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeFalsy();
		expect(comparator({}, {})).toBeFalsy();
	});
});

// some test cases are from:
// https://github.com/dashed/shallowequal/blob/master/test/shallowequal.test.js#L46
describe("shallowEqual", () => {

	const comparator = shallowEqual;

	it("returns false if either argument is null", () => {

		expect(comparator(null, {})).toBeFalsy();
		expect(comparator({}, null)).toBeFalsy();
	});

	it("returns true if both arguments are null or undefined", () => {
		expect(comparator(null, null)).toBeTruthy();
		expect(comparator(undefined, undefined)).toBeTruthy();
	});

	it("returns true if arguments are shallow equal", () => {
		expect(comparator({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBeTruthy();
	});

	it("returns false if arguments are not objects and not equal", () => {
		expect(comparator(1, 2)).toBeFalsy();
	});

	it("returns false if only one argument is not an object", () => {
		expect(comparator(1, {})).toBeFalsy();
	});

	it("returns false if first argument has too many keys", () => {
		expect(comparator({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBeFalsy();
	});

	it("returns false if second argument has too many keys", () => {
		expect(comparator({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBeFalsy();
	});

	it("returns true if values are not primitives but are ===", () => {
		let obj = {};
		expect(
			comparator({ a: 1, b: 2, c: obj }, { a: 1, b: 2, c: obj })
		).toBeTruthy();
	});

	it("should treat objects created by `Object.create(null)` like any other plain object", () => {
		function Foo(this: any) {
			this.a = 1;
		}

		Foo.prototype.constructor = null;

		const object2 = { a: 1 };
		// @ts-ignore
		expect(comparator(new Foo(), object2)).toBeTruthy();

		const object1 = Object.create(null);
		object1.a = 1;
		expect(comparator(object1, object2)).toBeTruthy();
	});


});


// some tests copied from:
// https://github.com/react-hook-form/react-hook-form/blob/master/src/__tests__/utils/deepEqual.test.ts
describe("isEqual", () => {
	const comparator = isEqual;

	it("should return false when two sets dont match", () => {
		expect(
			comparator([{ test: "123" }, { test: "455" }, { test: "455" }], [])
		).toBeFalsy();

		expect(
			comparator(
				[{ test: "123" }, { test: "455" }, { test: "455" }],
				[{ test: "123" }, { test: "455" }, { test: "455", test1: "what" }]
			)
		).toBeFalsy();

		expect(comparator([{}], [])).toBeFalsy();

		expect(comparator([], [{}])).toBeFalsy();
		expect(comparator(new Date(), new Date("1999"))).toBeFalsy();

		expect(
			comparator(
				{
					unknown: undefined,
					userName: "",
					fruit: ""
				},
				{
					userName: "",
					fruit: "",
					break: {}
				}
			)
		).toBeFalsy();
	});

	it("should return false when either type is primitive", () => {
		expect(comparator(null, [])).toBeFalsy();
		expect(comparator([], null)).toBeFalsy();
		expect(comparator({}, undefined)).toBeFalsy();
		expect(comparator(undefined, {})).toBeFalsy();
	});

	it("should return true when two sets matches", () => {
		expect(
			comparator([{ name: "asdf" }], [{ name: "asdf" }])
		).toBeTruthy();

		expect(
			comparator(
				[{ test: "123" }, { test: "455" }, { test: "455" }],
				[{ test: "123" }, { test: "455" }, { test: "455" }]
			)
		).toBeTruthy();

		expect(comparator({}, {})).toBeTruthy();

		expect(comparator([], [])).toBeTruthy();

		expect(
			comparator(
				[{ test: "123" }, { test: "455" }],
				[{ test: "123" }, { test: "455" }]
			)
		).toBeTruthy();

		expect(
			comparator(
				[
					{
						test: "123",
						nestedArray: [{ test: "123" }, { test: "455" }, { test: "455" }]
					},
					{
						test: "455",
						nestedArray: [{ test: "123" }, { test: "455" }, { test: "455" }]
					}
				],
				[
					{
						test: "123",
						nestedArray: [{ test: "123" }, { test: "455" }, { test: "455" }]
					},
					{
						test: "455",
						nestedArray: [{ test: "123" }, { test: "455" }, { test: "455" }]
					}
				]
			)
		).toBeTruthy();

		expect(
			comparator(
				{
					prop1: 'value1',
					prop2: 'value2',
					prop3: 'value3',
					prop4: {
						subProp1: 'sub value1',
						subProp2: {
							subSubProp1: 'sub sub value1',
							subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
						}
					},
					prop5: 1000,
					prop6: new Date(2016, 2, 10)
				},
				{
					prop5: 1000,
					prop3: 'value3',
					prop1: 'value1',
					prop2: 'value2',
					prop6: new Date('2016/03/10'),
					prop4: {
						subProp2: {
							subSubProp1: 'sub sub value1',
							subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
						},
						subProp1: 'sub value1'
					}
				}
			)
		).toBeTruthy();

	});

	it("should compare date time object valueOf", () => {
		expect(
			comparator({ test: new Date("1990") }, { test: new Date("1990") })
		).toBeTruthy();
	});
});
