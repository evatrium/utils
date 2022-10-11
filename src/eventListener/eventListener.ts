/**
 * wrapper for eventListener. returns a function to unlisten.
 * @param emitter - element (ex:window)
 * @param event - ex: "scroll"
 * @param callback
 * @param options
 * @returns function to unlisten
 */
export const eventListener = (
	emitter: Window | HTMLElement,
	event: keyof WindowEventMap | keyof DocumentEventMap,
	callback: EventListener,
	options?: object
) => {
	emitter.addEventListener(event, callback, options);
	return () => {
		emitter.removeEventListener(event, callback, options);
	};
};
