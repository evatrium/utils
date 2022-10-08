import {isNullOrUndefined} from "~/isNullOrUndefined";
import {isObjectType} from "~/isObjectType";

/**
 * is value "plain" object "{}"
 * - is value an object
 * - not null
 * - and .constructor === Object
 */
export const isObj = (value: any): boolean =>
	!isNullOrUndefined(value) &&
	isObjectType(value) &&
	value?.constructor === Object;
