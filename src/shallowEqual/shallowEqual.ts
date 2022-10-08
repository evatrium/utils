import {isObject} from "~/isObject";

/**
 * like propsChanged but compares primitives as well
 * uses more strict Object.is
 * inspired by shallowequal: https://github.com/dashed/shallowequal
 */
export function shallowEqual(objA: any, objB: any) {
	if (Object.is(objA, objB)) return true;
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
