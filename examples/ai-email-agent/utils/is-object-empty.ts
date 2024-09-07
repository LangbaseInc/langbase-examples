/**
 * Checks if an object is empty.
 *
 * @param obj - The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj: object): boolean => {
	return Object.keys(obj).length === 0;
};
