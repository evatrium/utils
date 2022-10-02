import {jsonParse} from "~/others";
// mock
let ls = {
	getItem() {
	},
	setItem() {
	},
	clear() {
	},
	removeItem() {
	}
};

if (isBrowser) ls = window.localStorage;


export const CreateLocalStore = ({namespace = '', debounceSet = 500} = {}) => {

	const localStoreSetItem = (key, val) => ls.setItem(namespace + (key || ''), JSON.stringify(val));
	const setItemDebounced = debounce(localStoreSetItem, debounceSet);

	return {
		clear: () => ls.clear(),
		removeItem: key => ls.removeItem(namespace + (key || '')),
		setItem: localStoreSetItem,
		setItemDebounced,
		subscribe: callback => eventListener(window, 'storage', callback),
		subscribeToKey: (key, callback) => {
			return eventListener(window, 'storage', (e) => {
				if (e.storageArea === localStorage && e.key === key) {
					const {data} = jsonParse(e.newValue);
					callback(data || null);
				}
			})
		},
		subscribeToNameSpace: callback => {
			return eventListener(window, 'storage', (e) => {
				if (e.storageArea === localStorage && e.key.startsWith(namespace)) {
					const {data} = jsonParse(e.newValue);
					callback(data || null);
				}
			})
		},
		getItem: key => {
			let item = ls.getItem(namespace + (key || ''));
			if (!item || item === 'undefined') return null;
			const {data} = jsonParse(item);
			return data || null;
		}
	}
}
