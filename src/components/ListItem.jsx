import { Checkbox, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import './ListItem.css';
import { updateItem, unCheckItem, deleteItem } from '../api/firebase';
import { getDaysBetweenDates } from '../utils';

export function ListItem({
	name,
	item,
	listToken,
	urgencyCategory,
	createAlert,
}) {
	const { isChecked, id, dateLastPurchased } = item;

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
			createAlert('List item successfully deleted', 'success');
		} else {
			createAlert('List item not deleted', 'warning');
		}
	};

	return (
		<div className="ListItemContainer">
			<li className="ListItem">
				<form>
					<Checkbox
						type="checkbox"
						name="purchased"
						id="purchased"
						checked={isChecked}
						onChange={handlePurchase}
					/>
					<label className="PurchasedItemName" htmlFor="purchased">
						{name}
					</label>
				</form>
			</li>
			<IconButton onClick={handleDelete}>
				<ClearIcon fontSize="large" />
			</IconButton>
		</div>
	);
}
