import {
	collection,
	onSnapshot,
	addDoc,
	getDocs,
	query,
	doc,
	updateDoc,
	where,
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

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item! You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function comparePurchaseUrgency(data) {
	for (let item of data) {
		const daysSincePurchase = item.dateLastPurchased
			? Math.floor(getDaysBetweenDates(item.dateLastPurchased))
			: Math.floor(getDaysBetweenDates(item.dateCreated));

		if (daysSincePurchase >= 60) {
			item.purchaseStatus = 'Inactive';
		} else {
			const daysUntilPurchase = item.dateLastPurchased
				? getDaysBetweenDates(item.dateNextPurchased)
				: getDaysBetweenDates(undefined, item.dateNextPurchased);

			console.log(`${item.name}: ${daysUntilPurchase}`);
			item.purchaseStatus = 'Active';
			item.days = daysUntilPurchase;
			if (daysUntilPurchase < 0) {
				item.urgencyCategory = 0; // Overdue
			} else if (daysUntilPurchase <= 7) {
				item.urgencyCategory = 1; // Soon
			} else if (daysUntilPurchase > 7 && daysUntilPurchase < 30) {
				item.urgencyCategory = 2; // Kind of Soon
			} else if (daysUntilPurchase >= 30) {
				item.urgencyCategory = 3; // Not Soon
			}
			// console.log(`${daysUntilPurchase}: ${item.urgencyCategory}`)
		}
	}

	// const sortByPurchaseStatus = (a, b) => {
	// 	const purchaseStatusA = a.purchaseStatus;
	// 	const purchaseStatusB = b.purchaseStatus;
	// 	if (purchaseStatusA < purchaseStatusB) {
	// 		return -1;
	// 	}
	// 	if (purchaseStatusA > purchaseStatusB) {
	// 		return 1;
	// 	}
	// 	return 0;
	// };

	// const sortByDays = (a, b) => a.days - b.days;

	// const sortByUrgencyCategory = (a, b) => a.urgencyCategory - b.urgencyCategory;

	// const sortByName = (a, b) => {
	// 	const nameA = a.name.toLowerCase();
	// 	const nameB = b.name.toLowerCase();
	// 	if (nameA < nameB) {
	// 		return -1;
	// 	}
	// 	if (nameA > nameB) {
	// 		return 1;
	// 	}
	// 	return 0;
	// };

	// data.sort(sortByDays);
	// data.sort(sortByUrgencyCategory);
	// data.sort(sortByName)

	data.sort(
		(a, b) =>
			a.purchaseStatus.localeCompare(b.purchaseStatus) ||
			a.urgencyCategory - b.urgencyCategory ||
			a.name.localeCompare(b.name),
	);

	return data;
}
