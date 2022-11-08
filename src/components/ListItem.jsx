import './ListItem.css';
import { updateItem, unCheckItem } from '../api/firebase';

export function ListItem({ name, item, listToken }) {
	const { isChecked, id, dateLastPurchased } = item;

	if (isChecked) {
		//check if it's been 24 hours since item was last marked as purchased
		let currentTime = new Date();
		let currentTimeInSeconds = currentTime.getTime() / 1000;
		let minutesSinceLastPurchased =
			(currentTimeInSeconds - dateLastPurchased.seconds) / 60;
		const minutesBeforeReset = 1440; // 24 hours x 60 minutes per hour
		if (minutesSinceLastPurchased >= minutesBeforeReset) {
			unCheckItem(listToken, id);
		}
	}

	const handlePurchase = () => {
		updateItem(listToken, item);
	};

	const itemUrgencyCategory = {
		0: 'Overdue',
		1: 'Soon',
		2: 'Kind of Soon',
		3: 'Not Soon',
		// 4: 'Inactive'
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
			<p className={`${item.purchaseStatus} Status`}>
				{item.purchaseStatus === 'Active'
					? `${itemUrgencyCategory[item.urgencyCategory]}`
					: `${item.purchaseStatus}`}
			</p>
		</li>
	);
}
