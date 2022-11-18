import './ListItem.css';
import { updateItem, unCheckItem, deleteItem } from '../api/firebase';
import { getDaysBetweenDates } from '../utils';

export function ListItem({ name, item, listToken, urgencyCategory }) {
	const { isChecked, id, dateLastPurchased } = item;

	const urgencyClass = urgencyCategory.replace(/\s/g, '');

	if (isChecked) {
		// If item was purchased over 1 day ago, uncheck item
		const daysSincePurchase = getDaysBetweenDates(dateLastPurchased);
		if (daysSincePurchase >= 1) {
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
					<input
						type="checkbox"
						name="purchased"
						id="purchased"
						checked={isChecked}
						onChange={handlePurchase}
					/>
					<label htmlFor="purchased">{name}</label>
				</form>
				<p className={`${urgencyClass} Status`}>{urgencyCategory}</p>
			</li>
			<button onClick={handleDelete}>Delete Item</button>
		</div>
	);
}
