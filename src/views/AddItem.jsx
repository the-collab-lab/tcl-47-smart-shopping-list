import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem() {
	// sets initial default values in form fields and deconstruct form field variables
	const initialState = { itemName: '', estimate: '7' };
	const [formData, setFormData] = useState(initialState);
	const { itemName, estimate } = formData;

	// for now, we retrieve the token for the test list from local storage;
	const token = window.localStorage.getItem('tcl-shopping-list-token');

	// updates state based on user input for multiple form fields
	const formHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	// if no item name provided, gives user feedback to add item
	// if item name provided, adds item to user's list and gives user success feedback
	const handleSubmit = (e) => {
		e.preventDefault();
		if (itemName === '') {
			alert('Please enter the name of your item.');
		} else {
			// changes string to number, as required by addItem function
			const daysUntilNextPurchase = +estimate;
			// uses addItem function imported from api; this takes 2 arguments: the user's token and the item object containing item name and estimate of next purchase date
			addItem(token, { itemName, daysUntilNextPurchase });
			alert(`You've added ${itemName} to your shopping list!`);
			//Clear Form Data
			setFormData(initialState);
		}
	};

	// displays a form with a text field for item name and 3 radio buttons for user to choose next purchase date estimate
	return (
		<div>
			<h1>Add a New Item</h1>
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
							value="7"
							id="soon"
							name="estimate"
							onChange={formHandler}
							checked={estimate === '7'}
						/>
						<label htmlFor="soon">Soon</label>
						<input
							type="radio"
							value="14"
							id="kindOfSoon"
							name="estimate"
							onChange={formHandler}
							checked={estimate === '14'}
						/>
						<label htmlFor="kindOfSoon">Kind of Soon</label>
						<input
							type="radio"
							value="30"
							id="notSoon"
							name="estimate"
							onChange={formHandler}
							checked={estimate === '30'}
						/>
						<label htmlFor="notSoon">Not Soon</label>
					</label>
				</fieldset>
				<button>Add Item</button>
			</form>
		</div>
	);
}
