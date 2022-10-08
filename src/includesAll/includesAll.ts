
/**
 * Checks if arr1 includes all items from arr2
 * @param arr1 the array to inspect
 * @param arr2 items that arr1 must contain
 */
export const includesAll = (
	arr1: any[],
	arr2: any[]
): boolean => {
	let len1 = arr1.length, len2 = arr2.length;
	//if arr1 is empty then it fails the inspection
	if (!len1 && len2) return false;
	for (let i = len2; i--;) if (!arr1.includes(arr2[i])) return false;
	return true;
};
