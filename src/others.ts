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

export type MemoizedFn<TFunc extends (this: any, ...args: any[]) => any> = {
	clear: () => void;
	(this: ThisParameterType<TFunc>, ...args: Parameters<TFunc>): ReturnType<TFunc>;
};

/**
 * memoizes a function.
 * results are cashed, keying off of the stringified arguments.
 * will only execute if the args change.
 * call "yourMemoizedFunction.clear()" to reset the cache
 * @example
 * 		const memoizedFunc = memoize((derp,asdf)=>{
 * 		  const results = computeSomething(derp, asdf);
 * 		  return results;
 * 		});
 *
 * 		//....
 *
 * 		<button onClick={()=> memoizedFunc(id, 'foobar')}	...
 */
export function memoizeArgs<TFunc extends (this: any, ...newArgs: any[]) => any>(
	fn: TFunc
): MemoizedFn<TFunc> {

	let cache: Record<string, any> | null = {};

	function memoized(
		this: ThisParameterType<TFunc>,
		...newArgs: Parameters<TFunc>
	): ReturnType<TFunc> {
		const keyLookup = signature(newArgs);
		if ((cache || (cache = {}))[keyLookup]) {
			// console.log("cache me outside how bout dat");
			return cache[keyLookup];
		}
		let result = fn.apply(this, newArgs);
		cache[keyLookup] = result;
		return result;
	}

	memoized.clear = () => {
		cache = null;
	};
	return memoized;
}

/**
 * @example
 * 	const obj = {a:1, b:2, c: 3};
 * 	const result = pluck(obj, ['b', 'c']);
 * 	// result -> {b:2, c:3}
 * @param obj - object to pluck from
 * @param arr - keys to pluck from object
 */
export const pluck = <T extends Record<string, any>>(obj: T, arr: string[]) =>
	arr.reduce((acc, curr) => (
		(acc[curr] = obj[curr]), acc
	), {} as Record<string, any>);

