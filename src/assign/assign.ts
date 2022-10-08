import { ObjOrArrType } from "~/types";

type AssignType = <T1 extends ObjOrArrType, T2 extends ObjOrArrType>(
	target: T1,
	source: T2
) => T1;
/**
 * assigns source key values to target
 * @param target [] | {}
 * @param source [] | {}
 * @returns original target with updated keys
 */
export const assign: AssignType = (target, source) => {
	for (const key in source) {
		if (key === "__proto__") {
			continue;
		}
		target[key] = source[key];
	}
	return target;
};
