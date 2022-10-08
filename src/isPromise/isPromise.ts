import { isObject } from "~/isObject";
import { isFunc } from "~/isFunc";

/**
 * is value a promise?
 */
export const isPromise = (value: any): boolean =>
	isObject(value) && isFunc(value.then);
