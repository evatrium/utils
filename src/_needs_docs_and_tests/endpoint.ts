import { isObj, isObjOrArr } from "~/isType";
import { isEmpty } from "~/comparisonChecks";
import {stringifyParams} from "~/_needs_docs_and_tests/url";

export const endpoint = (strings:string[], interpolations:any[]) =>
	strings.reduce((out, string, i) => {
		let value = interpolations[i];
		if (i === 0) {
			let [method, after] = string.split(":");
			out.method = method.toUpperCase();
			string = after;
		}
		if (isObjOrArr(value) && (string.endsWith(" ") || string.endsWith("\n"))) {
			out.body = JSON.stringify(value);
			out.url += string.trim();
			return out;
		}
		if (isObj(value)) {
			if (!isEmpty(value)) out.params = value = `?${stringifyParams(value)}`;
			else value = "";
		} else if (value === undefined) value = "";
		out.url += `${string}${value}`;
		return out;
	}, { url: "" } as Record<string, any>);
