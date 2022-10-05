import { isDateObject, isMap, isObj, isSet } from "~/isType";
import { ObjOrArrType } from "~/types";

/**
 * Simple deep copy of basic nested objects and arrays.
 * Ideal for state trees and json like objects, aka serializable data
 * For more robust features, use fast-copy - @see https://github.com/planttheidea/fast-copy
 */
export const simpleDeepCopy = <T>(data: T, _?: boolean): T => {
	const copier = _ === true /*which deep copy to use*/ ? deepCopy : simpleDeepCopy;
	const isArr = Array.isArray(data);
	if (isArr || isObj(data)) {
		let copy: any = isArr ? [] : {};
		for (const key in data) {
			if (key === "__proto__") continue;
			copy[key] = copier(data[key], _);
		}
		return copy;
	}
	return data;
};

/**
 * Deep copy of basic nested objects and arrays.
 * Ideal for state trees and json like objects, aka serializable data.
 * Handles basic primitives as well as maps, sets and date objects.
 * For more robust features, use fast-copy - @see https://github.com/planttheidea/fast-copy
 */
export const deepCopy = <T>(data: T): any => {
	if (isDateObject(data)) return new Date(data);
	else if (isSet(data)) return new Set(data);
	else if (isMap(data)) return new Map(data);
	return simpleDeepCopy(data, true);
};

/**
 *
 * assigns source to target
 * probably faster than native object assign
 * @param target [] | {}
 * @param source [] | {}
 * @returns original target
 */
export const assign = (target: ObjOrArrType, source: ObjOrArrType) => {
	for (let key in source) {
		if (key === "__proto__") {
			continue;
		}
		target[key] = source[key];
	}
	return target;
};

/**
 * makes a shallow copy of array or object.
 * equivalent to [...arr] or {...obj} but probs faster than native
 * @param objOrArr
 */
export const shallowCopy = (objOrArr: ObjOrArrType) => assign(Array.isArray(objOrArr) ? [] : {}, objOrArr);
