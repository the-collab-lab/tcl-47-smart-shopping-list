const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}
/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getDaysBetweenDates(olderDate, newerDate) {
	if (!newerDate) {
		newerDate = new Date();
		return Math.abs(newerDate - olderDate.toDate()) / 60 / 60 / 24 / 1000;
	} else {
		return (
			Math.abs(newerDate.toDate() - olderDate.toDate()) / 60 / 60 / 24 / 1000
		);
	}
	// console.log(Math.abs(diff/60/60/24/1000));
	// return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}
