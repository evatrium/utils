/**
 * check if an object or function has keys
 */
export const hasKeys = (objOrFunc: object | Function): boolean => {
	for (var key in objOrFunc) if (Object.prototype.hasOwnProperty.call(objOrFunc, key)) return true;
	return false;
};
