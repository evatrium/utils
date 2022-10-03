export const isWeb = typeof window !== "undefined" &&
	typeof window.HTMLElement !== "undefined" &&
	typeof document !== "undefined";


/**
 * @param emitter - element (ex:window)
 * @param event - ex: "scroll"
 * @param callback
 * @param options
 * @returns function to unsubscribe
 */
export const eventListener = (
	emitter: Window,
	event: keyof WindowEventMap | keyof DocumentEventMap,
	callback: EventListener ,
	options?: object
): Function => {
	emitter.addEventListener(event, callback, options);
	return () => emitter.removeEventListener(event, callback, options);
};


/**
 *
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?Document} doc Defaults to current document.
 * @return {Element | null}
 * @see https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/dom/getActiveElement.js
 * @see https://github.com/jaredpalmer/formik/blob/master/packages/formik/src/utils.ts
 */
export function getActiveElement(doc?: Document): Element | null {
	doc = doc || (isWeb ? document : undefined);
	if (typeof doc === "undefined") {
		return null;
	}
	try {
		return doc.activeElement || doc.body;
	} catch (e) {
		return doc.body;
	}
}
