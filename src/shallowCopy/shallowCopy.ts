import { ObjOrArrType } from "~/types";
import { assign } from "~/assign";

/**
 * makes a shallow copy of array or object.
 * equivalent to [...arr] or {...obj} but probs faster than native
 * @param objOrArr
 */
export const shallowCopy = (objOrArr: ObjOrArrType) =>
	assign(Array.isArray(objOrArr) ? [] : {}, objOrArr);
