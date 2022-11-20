import {
	collection,
	onSnapshot,
	addDoc,
	getDocs,
	query,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';

import { db } from './config';

import { getDaysBetweenDates, getFutureDate } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * Accepts user provided token and checks database to verify this token corresponds to an existing list
 * @param {string} listId The user's list token
 * @returns {Boolean} Does the list exist (True/False)
 *
 * Making queries:
 * @see: https://firebase.google.com/docs/firestore/query-data/queries
 *
 * One time data retrieval vs stream:
 * @see: https://firebase.google.com/docs/firestore/query-data/get-data
 */
export async function verifyExistingList(listId) {
	const collectionQuery = query(collection(db, listId));
	const snapshot = await getDocs(collectionQuery);

	return !!snapshot.docs.length;
}

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see: https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	return snapshot.docs.map((docRef) => {
		/**
		 * We must call a special `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		// This property will be used when we build out more of our UI.
		isChecked: false,
		name: itemName,
		totalPurchases: 0,
	});
}
/**
 * Uncheck list item when item
 * @param {string} listId The id of the list we're adding to.
 * @param {string} itemId The id of the list item
 */
export async function unCheckItem(listId, itemId) {
	const updatedItemData = {
		isChecked: false,
	};

	const docRef = doc(db, listId, itemId);
	await updateDoc(docRef, updatedItemData);
}

/**
 * Update list item in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} item list item data
 * @see https://firebase.google.com/docs/firestore/manage-data/add-data
 */
export async function updateItem(listId, item) {
	const {
		id,
		isChecked,
		dateCreated,
		dateLastPurchased,
		dateNextPurchased,
		totalPurchases,
	} = item;

	const currentDate = new Date();

	if (isChecked) {
		// TODO: Handle uncheck of purchased. This involves three variables
		// on the backend: isChecked, dateLastPurchased, and dateNextPurchased.
		// Potential solution: change dateLast/dateNext to arrays so we have history
	} else {
		// If the item has been purchased before, return previous estimate
		// If this is a first time purchase return difference between the
		// date of purchase and the date the item was created
		const previousEstimate = dateLastPurchased
			? getDaysBetweenDates(dateLastPurchased, dateNextPurchased)
			: getDaysBetweenDates(dateCreated, dateNextPurchased);

		// If the item has been purchased before, return days since
		// the last purchase. If this is a first time purchase, return
		// days since the item was created
		const daysSinceLastTransaction = dateLastPurchased
			? getDaysBetweenDates(dateLastPurchased)
			: getDaysBetweenDates(dateCreated);

		const updatedPurchaseCount = totalPurchases + 1;

		const updatedEstimate = calculateEstimate(
			previousEstimate,
			daysSinceLastTransaction,
			updatedPurchaseCount,
		);

		// Determine next date of purchase by adding the estimated days
		// until next purchase to current date.
		const updatedNextPurchaseDate = getFutureDate(updatedEstimate);

		const updatedItemData = {
			isChecked: true,
			dateLastPurchased: currentDate,
			totalPurchases: updatedPurchaseCount,
			dateNextPurchased: updatedNextPurchaseDate,
		};

		const docRef = doc(db, listId, id);
		await updateDoc(docRef, updatedItemData);
	}
}

export async function deleteItem(listId, itemId) {
	const docRef = doc(db, listId, itemId);
	await deleteDoc(docRef);
}

/**
 * Use next purchase date of items to establish the urgency of purchase.
 * Function returns an index corresponding to itemUrgency categories
 * @param {object} item Firestore document data
 */
export function getItemUrgency(item) {
	// If item is marked as checked, return purchased category
	if (item.isChecked) {
		return 5;
	}

	// If the item has been purchased before, return days since last purchase
	// If the item has never been purchased, return the days since item creation
	const daysSincePurchase = item.dateLastPurchased
		? getDaysBetweenDates(item.dateLastPurchased)
		: getDaysBetweenDates(item.dateCreated);

	// Assign urgency
	// If item was last purchased over 60 days ago, mark as inactive
	if (daysSincePurchase >= 60) {
		return 4; // Inactive
	} else {
		const daysUntilPurchase = item.dateLastPurchased
			? getDaysBetweenDates(item.dateNextPurchased)
			: getDaysBetweenDates(undefined, item.dateNextPurchased);
		// If there are less than 0 days until purchase, the item is overdue
		if (daysUntilPurchase < 0) {
			return 0; // Overdue items
			// If there are less than 7 days until purchase, the item is due soon
		} else if (daysUntilPurchase <= 7) {
			return 1; // Soon items
			// If there are more than 7 but less than 30 days until purchase, the item is due kind of soon
		} else if (daysUntilPurchase > 7 && daysUntilPurchase < 30) {
			return 2; // Kind of Soon items
			// If there are more than 30 days until purchase, the item is due not soon
		} else if (daysUntilPurchase >= 30) {
			return 3; // Not Soon items
			// All items should be handled by above, but if not, mark item as inactive
		} else {
			return 4; // Inactive items
		}
	}
}

/**
 * Compare purchase history of list items and sort items by
 * the urgency of next purchase and then alphabetically
 * @param {object} data The raw list data to be sorted.
 */
export function comparePurchaseUrgency(data) {
	// Create an empty, nested array for sorted data categories
	const sortedData = [];
	for (let i = 0; i < 6; i++) {
		sortedData.push([]);
	}

	//Sort items, first by urgency and then alphabetically.

	const sortByUrgencyCategory = (a, b) => getItemUrgency(a) - getItemUrgency(b);
	const sortByName = (a, b) => a.name.localeCompare(b.name);

	data.sort(sortByName).sort(sortByUrgencyCategory);

	// Group items by urgency category
	data.forEach((item) => {
		sortedData[getItemUrgency(item)].push(item);
	});

	return sortedData;
}
