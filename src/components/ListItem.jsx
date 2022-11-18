import { Checkbox } from '@mui/material';
import './ListItem.css';
import { updateItem, unCheckItem, deleteItem } from '../api/firebase';

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

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete item?')) {
			deleteItem(listToken, id);
		}
	};

	return (
		<div>
			<li className="ListItem">
				<form>
					<Checkbox
						type="checkbox"
						name="purchased"
						id="purchased"
						checked={isChecked}
						onChange={handlePurchase}
					/>
					<label htmlFor="purchased">{name}</label>
				</form>
			</li>
			<button onClick={handleDelete}>Delete Item</button>
		</div>
	);
}
