import { isObjOrArr } from "~/isType";

export type JsonParseResults = {
	data: ReturnType<typeof JSON.parse> | undefined,
	error: undefined | Error
}
/**
 * safe jsonParse wrapped in try catch with predictable return object
 * @returns { data, error }
 */
export const jsonParse = (str: string): JsonParseResults => {
	try {
		return { data: JSON.parse(str), error: undefined };
	} catch (error) {
		return { data: undefined, error: error as Error };
	}
};

/**
 * nonstandard stringify
 * quickly converts serializable data into string thumbprint
 * for things like cache key lookup.
 */
export const signature = (data: any): string => {
	if (!isObjOrArr(data)) return `${data}`;
	let out = ""; // @ts-ignore
	for (const key in data) out += `${key}${signature(data[key])}`;
	return out;
};

/**
 * @example
 * 	const obj = {a:1, b:2, c: 3};
 * 	const result = pluck(obj, ['b', 'c']);
 * 	// result -> {b:2, c:3}
 * @param obj - object to pluck from
 * @param keys - keys to pluck from object
 */
export const pluck = <T extends Record<string, any>>(obj: T, keys: string[]) =>
	keys.reduce((acc, curr) => (
		(acc[curr] = obj[curr]), acc
	), {} as Record<string, any>);
