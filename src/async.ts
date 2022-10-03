export type TryCatchFunc<TFunc extends (this: any, ...args: any[]) => Promise<any>> = {
	(this: ThisParameterType<TFunc>, ...args: Parameters<TFunc>): Promise<{ data: any, error: Error }>;
};

/**
 * wraps an async function in try catch
 * @param asyncFunc
 * @returns {data: the results from the async func, error: the cought }
 */
export function tryCatch<TFunc extends (this: any, ...newArgs: any[]) => any>(
	asyncFunc: TFunc
): TryCatchFunc<TFunc> {

	async function tryCatchPromise(
		this: ThisParameterType<TFunc>,
		...newArgs: Parameters<TFunc>
	): Promise<{ data: any, error: Error }> {
		let data: any, error: any;
		try {
			data = await asyncFunc.apply(this, newArgs);
		} catch (e) {
			error = e;
		}
		return { data, error };
	}

	return tryCatchPromise;
}