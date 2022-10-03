import { jsonParse } from "~/others";
import { isWeb, eventListener } from "~/web";
import { debounce } from "~/timing";
// mock
let ls: any = {
	getItem(): any {
	},
	setItem() {
	},
	clear() {
	},
	removeItem() {
	}
};

if (isWeb) ls = window.localStorage;


export type LocalStoreOptions = {
	namespace?: string,
	debounceTime?: number
};


export const CreateLocalStore = ({ namespace = "", debounceTime = 0 }: LocalStoreOptions = {}) => {

	const localStoreSetItem = (key: string, val?: any) => ls.setItem(namespace + (key || ""), JSON.stringify(val));

	const setItemDebounced = debounce(localStoreSetItem, debounceTime);

	return {
		clear: () => ls.clear(),
		removeItem: (key: string) => ls.removeItem(namespace + (key || "")),
		setItem: localStoreSetItem,
		setItemDebounced,
		subscribe: (callback: Function) => eventListener(window, "storage", callback as EventListener),
		subscribeToKey: (key: string = "", callback: Function) => {
			return eventListener(window, "storage", (e: StorageEventInit) => {
				if (e.storageArea === ls && e.key === key) {
					const { data } = jsonParse(e.newValue as string);
					callback(data || null);
				}
			});
		},
		subscribeToNameSpace: (callback: Function) => {
			return eventListener(window, "storage", (e: StorageEventInit) => {
				if (e.storageArea === ls && e?.key?.startsWith(namespace)) {
					const { data } = jsonParse(e.newValue as string);
					callback(data || null);
				}
			});
		},
		getItem: (key?: string) => {
			let item = ls.getItem(namespace + (key || ""));
			if (!item || item === "undefined") return null;
			const { data } = jsonParse(item);
			return data || null;
		}
	};
};
