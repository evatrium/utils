import { signature } from "./misc";

export type MemoizedCache = { [key: string]: any } //Record<string, any>;
export type MemoizedFn<TFunc extends (this: any, ...args: any[]) => any> = {
	clear: () => void;
	cache: MemoizedCache,
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
export function memoize<TFunc extends (this: any, ...newArgs: any[]) => any>(
	fn: TFunc
): MemoizedFn<TFunc> {

	function memoized(
		this: ThisParameterType<TFunc>,
		...newArgs: Parameters<TFunc>
	): ReturnType<TFunc> | any {

		const keyLookup = signature(newArgs);

		if (memoized.cache[keyLookup]) {
			// console.log("cache me outside how bout dat");
			return memoized.cache[keyLookup];
		}
		let result = fn.apply(this, newArgs);
		// @ts-ignore
		memoized.cache[keyLookup] = result;
		return result;
	}

	memoized.cache = {};

	memoized.clear = () => {
		memoized.cache = {};
	};

	return memoized;
}
