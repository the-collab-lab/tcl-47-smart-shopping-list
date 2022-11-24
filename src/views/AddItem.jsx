import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { addItem } from '../api/firebase';
import { Alert, Typography } from '@mui/material';

// sets number of days for each future purchase estimate variable
export const numDaysInEstimate = {
	soon: '7',
	kindOfSoon: '14',
	notSoon: '30',
	inactive: '60',
	overdue: '0',
};

// sets initial default values in form fields and deconstruct form field variables
const initialState = { itemName: '', estimate: numDaysInEstimate.soon };

export function AddItem({ data }) {
	const [formData, setFormData] = useState(initialState);
	const { itemName, estimate } = formData;
	const [message, setMessage] = useState(null);
	const [severity, setSeverity] = useState(null);

	// retrieves token from local storage, if one exists
	const token = window.localStorage.getItem('tcl-shopping-list-token');

	// updates state based on user input for multiple form fields
	const formHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	const itemNames = data.map((item) =>
		item.name.toLowerCase().replace(/[^a-z0-9]/gi, ''),
	);
	// if no item name provided, gives user feedback to add item
	// if item name provided, adds item to user's list and gives user success feedback
	const handleSubmit = (e) => {
		e.preventDefault();
		if (itemName === '') {
			setMessage('Please enter the name of your item.');
			setSeverity('warning');
		} else if (
			itemNames.includes(itemName.toLowerCase().replace(/[^a-z0-9]/gi, ''))
		) {
			setMessage(`You already have ${itemName} on your list!`);
			setSeverity('warning');
		} else {
			// changes string to number, as required by addItem function
			const daysUntilNextPurchase = +estimate;
			// uses addItem function imported from api; this takes 2 arguments: the user's token and the item object containing item name and numDaysInEstimate of next purchase date
			addItem(token, { itemName, daysUntilNextPurchase });
			setMessage(`You've added ${itemName} to your shopping list!`);
			setSeverity('success');
			//Clear Form Data
			setFormData(initialState);
		}
	};

	// displays a form with a text field for item name and 3 radio buttons for user to choose next purchase date numDaysInEstimate
	return (
		<div>
			{!!token ? (
				<div>
					<h1>Add a New Item</h1>
					{message ? (
						<Alert
							severity={severity}
							sx={{ display: 'flex', alignItems: 'center', fontSize: 'small' }}
						>
							{message}
						</Alert>
					) : null}
					<form onSubmit={handleSubmit}>
						<label htmlFor="itemName">Name:</label>
						<input
							type="text"
							name="itemName"
							id="itemName"
							value={itemName}
							onChange={formHandler}
						/>

						<fieldset>
							<legend>How soon will you buy this again?</legend>
							<label htmlFor="estimate">
								<input
									type="radio"
									value={numDaysInEstimate.soon}
									id="soon"
									name="estimate"
									onChange={formHandler}
									checked={estimate === numDaysInEstimate.soon}
								/>
								<label htmlFor="soon">Soon</label>
								<input
									type="radio"
									value={numDaysInEstimate.kindOfSoon}
									id="kindOfSoon"
									name="estimate"
									onChange={formHandler}
									checked={estimate === numDaysInEstimate.kindOfSoon}
								/>
								<label htmlFor="kindOfSoon">Kind of Soon</label>
								<input
									type="radio"
									value={numDaysInEstimate.notSoon}
									id="notSoon"
									name="estimate"
									onChange={formHandler}
									checked={estimate === numDaysInEstimate.notSoon}
								/>
								<label htmlFor="notSoon">Not Soon</label>
							</label>
						</fieldset>
						<button>Add Item</button>
					</form>
				</div>
			) : (
				<div>
					<p>🤽‍♀️ Your enthusiasm is admirable!</p>
					<p>
						But before you can add an item, you'll need to create or join a
						list!
					</p>
					<NavLink to="/">
						<button>Take me there!</button>
					</NavLink>
				</div>
			)}
		</div>
	);
}
