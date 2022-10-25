import './ListItem.css';
import { updateItem } from '../api/firebase';

const currentTime = new Date();
const numOfSecondsinMin = 60;

export function ListItem({ name, item, listToken }) {
	const { isChecked, id, totalPurchases, dateLastPurchased } = item;

	if (isChecked) {
		//check if it's been 24 hours since item was marked as purchased
		const timeDiffMinutes =
			(currentTime.getTime() / 1000 - dateLastPurchased.seconds) /
			numOfSecondsinMin;
		const minutesBeforeReset = 1440; // 24 hours x 60 minutes per hour
		if (timeDiffMinutes >= minutesBeforeReset) {
			const itemData = {
				isChecked: false,
			};
			updateItem(listToken, id, itemData);
		}
	}

	const handlePurchase = () => {
		if (isChecked) {
			const itemData = {
				isChecked: false,
			};
			updateItem(listToken, id, itemData);
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
			<form action="">
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
