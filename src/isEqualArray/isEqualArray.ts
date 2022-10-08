/**
 * checks if 2 arrays contain same items in the same order
 */
export const isEqualArray = (
	arr1: any[],
	arr2: any[],
	itemsAreEqual = (arr1Item: any, arr2Item: any) => arr1Item === arr2Item
): boolean => {
	const length = arr1.length;
	if (length !== arr2.length) return false;
	for (let i = 0; i < length; i++)
		if (!itemsAreEqual(arr1[i], arr2[i])) return false;
	return true;
};
