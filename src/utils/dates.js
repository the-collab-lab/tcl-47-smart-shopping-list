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
 * Get the difference between two dates in days
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {Object} olderDate The date which occurs first chronologically
 * @param {Object} newerDate The date which occurs second chronologically. Defaults to current date
 * @returns {number} The difference between the dates in days
 */
export function getDaysBetweenDates(olderDate, newerDate) {
	if (newerDate) {
		return (
			Math.abs(newerDate.toDate() - olderDate.toDate()) /
			ONE_DAY_IN_MILLISECONDS
		);
	} else {
		const currentDate = new Date();
		return Math.abs(currentDate - olderDate.toDate()) / ONE_DAY_IN_MILLISECONDS;
	}
}
