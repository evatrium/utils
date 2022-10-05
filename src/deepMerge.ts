import { isFunc, isObj } from "~/isType";
import { assign } from "~/copy";
import { ObjOrArrType } from "~/types";

type Options = {
	clone?: boolean,
	arrayMerge?: "overwrite" | "concat" | "byIndex" | typeof deepMerge
}

type DeepMerge = (target: ObjOrArrType, source: ObjOrArrType, options?: Options) => ObjOrArrType;

export const deepMerge: DeepMerge = (
	target,
	source,
	options = { clone: true, arrayMerge: "overwrite" }
): ObjOrArrType => {

	const tArr = Array.isArray(target),
		sArr = Array.isArray(source),
		tObj = isObj(target),
		sObj = isObj(source),
		bothArr = tArr && sArr,
		bothObj = tObj && sObj;

	if (!(bothArr || bothObj)) return source;

	let out = target;

	if (options.clone) out = assign(tArr ? [] : {}, target);

	if (bothArr && isFunc(options.arrayMerge)) { // @ts-ignore
		return options.arrayMerge(out, source, options);
	}

	if (bothObj || options.arrayMerge === "byIndex") {
		for (let key in source) {
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
