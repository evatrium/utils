import { PrimitiveType } from "~/types";
import {isNullOrUndefined} from "~/isNullOrUndefined";
import {isObjectType} from "~/isObjectType";

/**
 * is value of primitive type
 * | null | undefined | string | number | boolean | symbol | bigint
 */
export const isPrimitive = (value: any): value is PrimitiveType =>
	isNullOrUndefined(value) || !isObjectType(value);

