import { isDateObject, isMap, isObj, isSet } from "~/isType";
import { ObjOrArrType } from "~/types";

/**
 * Simple deep copy of basic nested objects and arrays.
 * Ideal for state trees and json like objects, aka serializable data
 * For more robust features, use fast-copy - @see https://github.com/planttheidea/fast-copy
 */
export const simpleDeepCopy = <T>(data: T, _extra?: boolean): T => {
	const copier = _extra ? deepCopy : simpleDeepCopy;
	const isArr = Array.isArray(data);
	if (isArr || isObj(data)) {
		let copy: any = isArr ? [] : {};
		for (const key in data) copy[key] = copier(data[key], _extra);
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
	for (let i in source) target[i] = source[i];
	return target;
};
/**
 * creates a container for copying an array or object
 * @param val
 */
export const emptyTarget = (val: ObjOrArrType) => Array.isArray(val) ? [] : {};

/**
 * makes a shallow copy of array or object.
 * equivalent to [...arr] or {...obj} but probs faster than native
 * @param objOrArr
 */
export const shallowCopy = (objOrArr: ObjOrArrType) => assign(emptyTarget(objOrArr), objOrArr);
