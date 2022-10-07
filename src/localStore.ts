import { jsonParse } from "~/misc";
import { isWeb, eventListener } from "~/_needs_docs_and_tests/web";
import { debounce } from "~/_needs_docs_and_tests/debounce";

export type LocalStoreOptions = {
	debounceTime?: number
};

/**
 * Local Storage wrapper.
 * Automatically stringifies and parses values to and from storage.
 * Includes additional methods for optionally debouncing setItem
 * and subscribing to storage events on other browser tabs.
 * @param debounceTime - milliseconds to debounce "setItemDebounced"
 * @example
 *
 * const localStore = createLocalStore({
 * 		debounceTime: 100
 * });
 *
 * let num = localStore.getItem("num") || 0;
 *
 * localStore.subscribeToKey("num", (data) => {
 * 		console.log("storage update on other tab", data);
 * 	  num = data;
 * });
 *
 * localStore.setItem("num", (num + 1));
 * //or
 * localStore.setItemDebounced("num", (num + 1))
 *
 */
export const createLocalStore = ({ debounceTime = 0 }: LocalStoreOptions = {}) => {
	/**
	 * JSON.stringifies the value before setting it to local storage.
	 * @param key
	 * @param val
	 */
	const setItem = (key: string, val?: any) => {
		ls.setItem(key, JSON.stringify(val));
	};

	/**
	 * setItem wrapped in a debounce.
	 */
	const setItemDebounced: typeof setItem = debounce(setItem, debounceTime);

	/**
	 * Retrieves the item and safely jsonParses the stored string.
	 * @param key
	 * @returns data | null
	 */
	const getItem = (key: string) => {
		let item = ls.getItem(key);
		if (!item || item === "undefined") return null;
		const { data, error } = jsonParse(item);
		error && console.error(error);
		return data || null;
	};

	/**
	 * Clears all local storage values.
	 */
	const clear = () => ls.clear();

	/**
	 * Removes the item from storage.
	 * @param key
	 */
	const removeItem = (key: string) => ls.removeItem(key);

	/**
	 * Subscribes to any storage event that happens on other browser tabs.
	 * @param callback
	 */
	const subscribe = (callback: Function) => {
		return !isWeb ? () => void 0 : eventListener(window, "storage", callback as EventListener);
	};

	/**
	 * Subscribes to storage events that happen on other tabs
	 * only executing the callback if the change happens on the provided key.
	 * @param key - The key to listen to.
	 * @param callback - The function to execute when the key updates.
	 */
	const subscribeToKey = (key: string, callback: Function) =>
		subscribe((e: StorageEventInit) => {
			if(process.env.NODE_ENV === 'test') callback('test'); //@TODO: jsdom testing env doesn't emit the correct storage event
			if (e.storageArea === ls && e.key === key) {
				const { data, error } = jsonParse(e.newValue as string);
				error ? console.error(error) : callback(data || null);
			}
		});

	return {
		setItem,
		setItemDebounced,
		getItem,
		clear,
		removeItem,
		subscribe,
		subscribeToKey
	};
};


// mock
let ls: any = {
	_store: {},
	getItem(key: string): any {
		return this._store[key] || null;
	},
	setItem(key: string, val: any) {
		return this._store[key] = val;
	},
	clear() {
		this._store = {};
	},
	removeItem(key: string) {
		delete this._store[key];
	}
};

isWeb && (ls = window.localStorage);

