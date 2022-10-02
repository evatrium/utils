import {PrimitiveType} from "~/types";

/**
 * is typeof value string
 */
export const isString = (value: unknown): value is string => typeof value === "string";

/**
 * is value instance of RegExp
 */
export const isRegexp = (value: unknown): value is RegExp => value instanceof RegExp;

/**
 * is value typeof value object
 */
export const isObjectType = (value: any): boolean => typeof value === "object";

/**
 * is value null or undefined
 */
export const isNullOrUndefined = (value: any): value is null | undefined => value == null;

/**
 * is typeof value type object and not null
 */
export const isObject = (value: any): boolean =>
	!isNullOrUndefined(value) && isObjectType(value);

/**
 * is value "plain" object "{}"
 * - is value an object
 * - not null
 * - and constructor === Object
 */
export const isObj = (value: any): boolean =>
	!isNullOrUndefined(value) &&
	isObjectType(value) &&
	value?.constructor === Object;

/**
 * is value plain object {} or array []
 */
export const isObjOrArr = (value: any): value is object | any[] =>
	isObj(value) || Array.isArray(value);

/**
 * is value a function
 */
export const isFunc = (value: any): boolean => typeof value === "function";

/**
 * is value a number, not NaN, and finite
 */
export const isNum = (value: any): boolean =>
	typeof value === "number" && !isNaN(value - 0) && isFinite(value);

/**
 *	is value boolean
 */
export const isBool = (value: any): value is boolean => typeof value === "boolean";

/**
 * is value instanceof Map
 */
export const isMap = (value: any): value is Map<any,any> => value instanceof Map;

/**
 * is value instance of Set
 */
export const isSet = (value: any): value is Set<any> => value instanceof Set;

/**
 * is value a promise?
 */
export const isPromise = (value: any): boolean => isObject(value) && isFunc(value.then);

/**
 * is value an instance of Date?
 */
export const isDateObject = (value: any): value is Date => value instanceof Date;


/**
 * is value of primitive type
 * | null | undefined | string | number | boolean | symbol | bigint
 */
export const isPrimitive = (value: unknown): value is PrimitiveType =>
	isNullOrUndefined(value) || !isObjectType(value);

