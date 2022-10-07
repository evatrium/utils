import { isDateObject, isFunc, isMap, isObj, isObject, isPrimitive, isSet } from "~/isType";


/**
 * deeply compares nested objects and nested arrays,
 * date objects and primitives, best suited for serializable data
 * for more robust comparisons, use lodash or search deep equal
 */
export const isEqual = (x: any, y: any): boolean => {
	if (isPrimitive(x) || isPrimitive(y)) return x === y;
	if (isDateObject(x) && isDateObject(y)) return x.getTime() === y.getTime();
	const keys1 = Object.keys(x), keys2 = Object.keys(y);
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) {
		let val1 = x[key], val2 = y[key];
		if (!keys2.includes(key)) return false;
		if ((isDateObject(val1) && isDateObject(val2))
		|| (isObj(val1) && isObj(val2))
		|| (Array.isArray(val1) && Array.isArray(val2))
			? !isEqual(val1, val2) : val1 !== val2
		) return false;
	}
	return true;
};

/**
 * check if an object or function has keys
 */
export const hasKeys = (objOrFunc: object | Function): boolean => {
	for (var key in objOrFunc) if (Object.prototype.hasOwnProperty.call(objOrFunc, key)) return true;
	return false;
};

/**
 * Checks if a data structure is empty: [], {}, Map, Set
 * and if a function is passed, checks if it has keys
 * returns true if any other given value is falsy
 */
export const isEmpty = (value: any): boolean => {
	if (Array.isArray(value)) return value.length === 0;
	else if (isMap(value) || isSet(value)) return value.size === 0;
	else if (isObject(value) || isFunc(value)) return !hasKeys(value);
	return !value;
};


/**
 * checks if prev props match the next props
 * given that the number of keys have not changed
 */
export const fixedPropsChanged = (prev: Record<string, any>, next: Record<string, any>): boolean => {
	for (let i in next) if (prev[i] !== next[i]) return true;
	return false;
};

/**
 * similar to shallow equal but for objects only
 * checks if number of keys are the same
 * and compares each key value pair for equality "==="
 */
export const propsChanged = (prev: Record<string, any>, next: Record<string, any>): boolean => {
	for (let i in prev) if (!(i in next)) return true;
	return fixedPropsChanged(prev, next);
};

/**
 * like propsChanged but compares primitives as well
 * uses more strict Object.is
 * inspired by shallowequal: https://github.com/dashed/shallowequal
 */
export function shallowEqual(objA: any, objB: any) {
	if (Object.is(objA, objB)) return true;
	// if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) return false;
	if (!isObject(objA) || !isObject(objB)) return false;
	var keysA = Object.keys(objA);
	var keysB = Object.keys(objB);
	if (keysA.length !== keysB.length) return false;
	var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	for (var idx = 0; idx < keysA.length; idx++) {
		var key = keysA[idx];
		if (!bHasOwnProperty(key)) return false;
		var valueA = objA[key];
		var valueB = objB[key];
		if (!Object.is(valueA, valueB)) return false;
	}
	return true;
}

/**
 * Checks if arr1 includes all items from arr2
 * @param arr1 the array to inspect
 * @param arr2 items that must be included in arr1
 */
export const includesAll = (
	arr1: any[],
	arr2: any[]
): boolean => {
	let len1 = arr1.length, len2 = arr2.length;
	//if arr1 is empty then it fails the inspection
	if (!len1 && len2) return false;
	for (let i = len2; i--;) if (!arr1.includes(arr2[i])) return false;
	return true;
};

/**
 * checks if 2 arrays contain same items in the same order
 */
export const isEqualArray = (
	arr1: any[],
	arr2: any[],
	isEqual = (arr1Item: any, arr2Item: any) => arr1Item === arr2Item
): boolean => {
	let length = arr1.length;
	if (length !== arr2.length) return false;
	for (let i = 0; i < length; i++) if (!isEqual(arr1[i], arr2[i])) return false;
	return true;
};
