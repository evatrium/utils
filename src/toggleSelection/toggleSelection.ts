import { MatchByOptions } from "~/getMatchBy";
import { findInArray } from "~/findInArray";
import { excludeItemsFromArray } from "~/excludeItemsFromArray";

type ToggleSelectionOptions = Omit<MatchByOptions, "matchByOnValue"> & {
	returnAction?: boolean
}

/**
 * removes an item an array if it exists. adds item to array if it does not exist.
 * @param selections
 * @param item
 * @param options
 */
export const toggleSelection = (selections: any[], item: any, options?: ToggleSelectionOptions) => {

	let { matchBy, returnAction } = options || {};

	const matchByOnValue = !!matchBy;

	let out, action;

	if (!findInArray(selections, item, { matchBy, matchByOnValue })) {
		out = [...selections, item];
		action = { added: item };
	} else {
		const [update, removed] = excludeItemsFromArray(selections, [item], {
			matchBy,
			matchByOnValue,
			returnRemoved: true
		});
		out = update;
		action = { removed };
	}

	return returnAction ? [out, action] : out;
};
