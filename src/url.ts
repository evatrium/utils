import { isWeb } from "~/web";
import {isObj} from "~/isType";
import {isEmpty} from "~/comparisonChecks";

export const stringifyParams = (obj: Record<string, any>) =>
	new URLSearchParams(obj).toString();

export const getParams = (string?: string) =>
	Object.fromEntries(
		new URLSearchParams(
			string || (isWeb ? location.search : "")
		)
	);

export const url = (strings:string[], ...interpolations:any[]) =>
	strings.reduce((out, string, i) => {
		let value = interpolations[i];
		if (isObj(value)) {
			value = isEmpty(value) ? "" : `${string.endsWith("?") ? "" : "?"}${stringifyParams(value)}`;
		}
		if (value === undefined) value = "";
		out += `${string}${value}`;
		return out;
	}, "");


