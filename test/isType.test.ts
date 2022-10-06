import { describe, it, expect } from "vitest";
import {
	isString,
	isRegexp,
	isObjectType,
	isNullOrUndefined,
	isObject,
	isObj,
	isObjOrArr,
	isFunc,
	isNum,
	isBool,
	isMap,
	isSet,
	isPromise,
	isDateObject,
	isPrimitive, isBigInt
} from "../src";


describe("isString", () => {

	const type = "string";
	const isType = isString;


	it(`should return true when value is ${type}`, () => {
		expect(isType("")).toBeTruthy();
		expect(isType("foo")).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
	});

});

describe("isRegexp", () => {

	const type = "regex";
	const isType = isRegexp;


	it(`should return true when value is a ${type}`, () => {
		expect(isType(new RegExp("[a-z]"))).toBeTruthy();
	});

	it(`should return false when value is not a ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
	});

});

describe("isObjectType", () => {

	const type = "object type";
	const isType = isObjectType;

	it(`should return true when value is ${type}`, () => {
		expect(isType({})).toBeTruthy();
		expect(isType([])).toBeTruthy();
		expect(isType(null)).toBeTruthy();
		expect(isType(new Blob())).toBeTruthy();
		expect(isType(new Promise(() => 0))).toBeTruthy();
		expect(isType(new Date())).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
	});

});

describe("isNullOrUndefined", () => {

	const type = "null or undefined";
	const isType = isNullOrUndefined;

	it(`should return true when value is ${type}`, () => {
		expect(isType(null)).toBeTruthy();
		expect(isType(undefined)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType("")).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});

});

describe("isObject", () => {

	const type = "object and not null";
	const isType = isObject;

	it(`should return true when value is ${type}`, () => {
		expect(isType(new Promise(() => 0))).toBeTruthy();
		expect(isType(new Date())).toBeTruthy();
		expect(isType({ foo: "bar" })).toBeTruthy();
		expect(isType({})).toBeTruthy();
		expect(isType([])).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType("foo")).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
	});

});

describe("isObj", () => {

	const type = "plain object {} and not null";
	const isType = isObj;

	it(`should return true when value is a ${type}`, () => {
		expect(isType({})).toBeTruthy();
		expect(isType({ foo: "bar" })).toBeTruthy();

		// expect(isType(Object.create(null))).toBeTruthy(); //@TODO: need to look into this one
	});

	it(`should return false when value is not a ${type}`, () => {
		expect(isType(Object)).toBeFalsy();
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(new Promise(() => 0))).toBeFalsy();
		expect(isType(new Date())).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType([])).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
	});

});


describe("isObjOrArr", () => {

	const type = "plain object {} or array []";
	const isType = isObjOrArr;

	it(`should return true when value is ${type}`, () => {
		expect(isType([])).toBeTruthy();
		expect(isType({ foo: "bar" })).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
	});

});

describe("isFunc", () => {

	const type = "function";
	const isType = isFunc;

	it(`should return true when value is ${type}`, () => {
		expect(isType(() => null)).toBeTruthy();
		expect(
			isType(function foo() {
				return null;
			})
		).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});

});


describe("isNum", () => {

	const type = "number";
	const isType = isNum;
	const bigInt = BigInt(Number.MAX_SAFE_INTEGER);
	const bigInt_n = 123n;

	it(`should return true when value is ${type}`, () => {
		expect(isType(-1)).toBeTruthy();
		expect(isType(0)).toBeTruthy();
		expect(isType(1)).toBeTruthy();
		expect(isType(1.1)).toBeTruthy();
		expect(isType(1e5)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType("0")).toBeFalsy();
		expect(isType("1")).toBeFalsy();
		expect(isType(Infinity)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();

		expect(isType(bigInt)).toBeFalsy();
		expect(isType(bigInt_n)).toBeFalsy();
	});

});

describe("isBigInt", () => {

	const type = "bigint";
	const isType = isBigInt;

	it(`should return true when value is ${type}`, () => {
		const bigInt = BigInt(Number.MAX_SAFE_INTEGER)

		expect(isType(bigInt)).toBeTruthy();

		const bigInt_n = 123n;
		expect(isType(bigInt_n)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType("0")).toBeFalsy();
		expect(isType("1")).toBeFalsy();
		expect(isType(Infinity)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});

});

describe("isBool", () => {

	const type = "boolean";
	const isType = isBool;

	it(`should return true when value is ${type}`, () => {
		expect(isType(true)).toBeTruthy();
		expect(isType(false)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});

});


describe("isMap", () => {

	const type = "instance of map";
	const isType = isMap;

	it(`should return true when value is ${type}`, () => {
		expect(isType(new Map())).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(new Set())).toBeFalsy();
		expect(isType(true)).toBeFalsy();
		expect(isType(false)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});

});

describe("isSet", () => {

	const type = "instance of set";
	const isType = isSet;

	it(`should return true when value is ${type}`, () => {
		expect(isType(new Set())).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(new Map())).toBeFalsy();
		expect(isType(true)).toBeFalsy();
		expect(isType(false)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});

});


describe("isPromise", () => {

	const type = "promise";
	const isType = isPromise;

	it(`should return true when value is ${type}`, () => {
		const prom = new Promise(() => 1);
		expect(isType(prom)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(new Map())).toBeFalsy();
		expect(isType(new Set())).toBeFalsy();
		expect(isType(true)).toBeFalsy();
		expect(isType(false)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});

});

describe("isDateObject", () => {

	const type = "date";
	const isType = isDateObject;

	it(`should return true when value is ${type}`, () => {
		const date = new Date();
		expect(isType(date)).toBeTruthy();
	});

	it(`should return false when value is not ${type}`, () => {
		expect(isType(null)).toBeFalsy();
		expect(isType(new Map())).toBeFalsy();
		expect(isType(new Set())).toBeFalsy();
		expect(isType(true)).toBeFalsy();
		expect(isType(false)).toBeFalsy();
		expect(isType(undefined)).toBeFalsy();
		expect(isType(-1)).toBeFalsy();
		expect(isType(0)).toBeFalsy();
		expect(isType(1)).toBeFalsy();
		expect(isType(NaN)).toBeFalsy();
		expect(isType(new String("test"))).toBeFalsy();
		expect(isType(() => null)).toBeFalsy();
		expect(isType(new Blob())).toBeFalsy();
		expect(isType({})).toBeFalsy();
		expect(isType([])).toBeFalsy();
	});

});


describe("isPrimitive", () => {
	it("should return true when value is a string", () => {
		expect(isPrimitive("foobar")).toBeTruthy();
	});

	it("should return true when value is a boolean", () => {
		expect(isPrimitive(false)).toBeTruthy();
	});

	it("should return true when value is a number", () => {
		expect(isPrimitive(123)).toBeTruthy();
	});

	it("should return true when value is a symbol", () => {
		expect(isPrimitive(Symbol())).toBeTruthy();
	});

	it("should return true when value is null", () => {
		expect(isPrimitive(null)).toBeTruthy();
	});

	it("should return true when value is undefined", () => {
		expect(isPrimitive(undefined)).toBeTruthy();
	});

	it("should return false when value is an object", () => {
		expect(isPrimitive({})).toBeFalsy();
	});

	it("should return false when value is an array", () => {
		expect(isPrimitive([])).toBeFalsy();
	});
});
