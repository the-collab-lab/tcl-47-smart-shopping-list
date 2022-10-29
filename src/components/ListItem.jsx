import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({ name, item, listToken }) {
	const { isChecked, id, totalPurchases, dateLastPurchased } = item;

	if (isChecked) {
		//check if it's been 24 hours since item was last marked as purchased
		let currentTime = new Date();
		let currentTimeInSeconds = currentTime.getTime() / 1000;
		let minutesSinceLastPurchased =
			(currentTimeInSeconds - dateLastPurchased.seconds) / 60;
		const minutesBeforeReset = 1440; // 24 hours x 60 minutes per hour
		if (minutesSinceLastPurchased >= minutesBeforeReset) {
			const itemData = {
				isChecked: false,
			};
			updateItem(listToken, id, itemData);
		}
	}

	const handlePurchase = () => {
		let currentTime = new Date();
		if (isChecked) {
			// TODO: Handle uncheck of purchased. This involves three variables
			// on the backend: isChecked, dateLastPurchased, and dateNextPurchased.
			// Potential solution: change dateLast/dateNext to arrays so we have history
		} else {
			const updatedPurchaseCount = totalPurchases + 1;
			const itemData = {
				isChecked: true,
				dateLastPurchased: currentTime,
				totalPurchases: updatedPurchaseCount,
			};
			updateItem(listToken, id, itemData);
		}
	};

	return (
		<li className="ListItem">
			<form>
				<input
					type="checkbox"
					name="purchased"
					id="purchased"
					checked={isChecked}
					onChange={handlePurchase}
				/>
				<label htmlFor="purchased">{name}</label>
			</form>
		</li>
	);
}
