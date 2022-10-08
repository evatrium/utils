import { ObjOrArrType } from "~/types";
import { assign } from "~/assign";
import { isObj } from "~/isObj";
import { isFunc } from "~/isFunc";

type Options = {
	clone?: boolean,
	arrayMerge?: "overwrite" | "concat" | "byIndex" | DeepMerge
}

type DeepMerge = <T1 extends ObjOrArrType, T2 extends Partial<T1 | ObjOrArrType>> (
	target: T1,
	source: T2,
	options?: Options
) => T2 | T1 & T2;


/**
 * Deep merge two nested objects or arrays
 * @param target
 * @param source
 * @param options = {
 *   clone?: boolean = true,
 *   arrayMerge?: string|function = "overwrite" //
 * }
 * clone: if true (default), will assign items of object/array to new object/array
 * arrayMerge: one of union types ("overwrite" | "concat" | "byIndex" | typeof deepMerge)
 * 		see tests for examples that illustrate the differences
 */

export const deepMerge: DeepMerge = (
	target,
	source,
	options: Options = { clone: true, arrayMerge: "overwrite" }
) => {

	const tArr = Array.isArray(target),
		sArr = Array.isArray(source),
		tObj = isObj(target),
		sObj = isObj(source),
		bothArr = tArr && sArr,
		bothObj = tObj && sObj;

	if (!(bothArr || bothObj)) return source as any;

	let out: ObjOrArrType = target;

	if (options.clone) out = assign(tArr ? [] : {}, target);

	if (bothArr && isFunc(options.arrayMerge)) { // @ts-ignore
		return options.arrayMerge(out, source, options);
	}

	if (bothObj || options.arrayMerge === "byIndex") {
		for (let key in source as ObjOrArrType) {
			if (key === "__proto__") {
				continue;
			}
			out[key] = deepMerge(target[key], source[key], options);
		}
		return out;
	}

	if (options.arrayMerge === "concat") return (out.concat(source));

	return source;

};
