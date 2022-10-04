import { isObj } from "~/isType";
import { shallowCopy } from "~/copy";
import { ObjOrArrType } from "~/types";

type Options = { clone?: boolean, arrayMerge?: "overwrite" | "concat" | "byIndex" }

export const deepMerge = (target: ObjOrArrType, source: ObjOrArrType, options: Options): ObjOrArrType => {

	const { clone = true, arrayMerge = "overwrite" } = options || ({} as Options);

	const tArr = Array.isArray(target), sArr = Array.isArray(source),
		tObj = isObj(target), sObj = isObj(source),
		bothArr = tArr && sArr, bothObj = tObj && sObj;

	if (!(bothArr || bothObj)) return source;

	let out = target;

	if (clone) out = shallowCopy(target);

	if (bothObj || arrayMerge === "byIndex") {
		for (let key in source) {
			if (key === "__proto__") continue;
			out[key] = deepMerge(out[key], source[key], { clone, arrayMerge });
		}
		return out;
	}

	if (arrayMerge === "concat") return (out.concat(source));

	return source;

};
