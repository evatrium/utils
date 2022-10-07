

export type DebouncedFunc<TFunc extends (this: any, ...args: any[]) => any> = {
	cancel: () => void;
	(this: ThisParameterType<TFunc>, ...args: Parameters<TFunc>): void;
};

export function debounce<TFunc extends (this: any, ...newArgs: any[]) => void>(
	func: TFunc,
	wait: number = 0
): DebouncedFunc<TFunc> {

	let timeout: any = undefined;

	function debounced(
		this: ThisParameterType<TFunc>,
		...newArgs: Parameters<TFunc>
	) {
		const later = () => {
			func.apply(this, newArgs);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}

	debounced.cancel = () => {
		clearTimeout(timeout);
	};

	return debounced;
}
