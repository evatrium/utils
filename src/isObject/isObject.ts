import {isNullOrUndefined} from "~/isNullOrUndefined";
import {isObjectType} from "~/isObjectType";

/**
 * is typeof value type object and not null
 */
export const isObject = (value: any): boolean =>
	!isNullOrUndefined(value) && isObjectType(value);
