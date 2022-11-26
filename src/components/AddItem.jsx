import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { addItem } from '../api/firebase';

import {
	Button,
	FormControl,
	FormControlLabel,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';

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

export function AddItem({ data, setAddItem, createAlert }) {
	const [formData, setFormData] = useState(initialState);
	const { itemName, estimate } = formData;

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
			createAlert('Please enter the name of your item.', 'warning');
		} else if (
			itemNames.includes(itemName.toLowerCase().replace(/[^a-z0-9]/gi, ''))
		) {
			createAlert(`You already have ${itemName} on your list!`, 'warning');
		} else {
			// changes string to number, as required by addItem function
			const daysUntilNextPurchase = +estimate;
			// uses addItem function imported from api; this takes 2 arguments: the user's token and the item object containing item name and numDaysInEstimate of next purchase date
			addItem(token, { itemName, daysUntilNextPurchase });
			createAlert(`You've added ${itemName} to your shopping list!`, 'success');
			//Clear Form Data
			setFormData(initialState);
		}
	};

	const onCancel = () => {
		setFormData(initialState);
		setAddItem(false);
	};

	// displays a form with a text field for item name and 3 radio buttons for user to choose next purchase date numDaysInEstimate
	return (
		<Paper sx={{ py: 2, px: 5 }} elevation={3}>
			{!!token ? (
				<div>
					<Typography variant="h3" sx={{ mb: 2 }}>
						Add New Item
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Item Name"
							type="text"
							name="itemName"
							id="itemName"
							value={itemName}
							onChange={formHandler}
							fullWidth
							sx={{ mb: 2 }}
						/>

						<fieldset
							style={{
								border: '1px solid #ccc',
								borderRadius: 5,
								margin: 0,
								marginBottom: 10,
								padding: 20,
							}}
						>
							<legend>How soon will you buy this again?</legend>
							<label htmlFor="estimate">
								<FormControl>
									<RadioGroup
										name="estimate"
										value={estimate}
										onChange={formHandler}
									>
										<FormControlLabel
											value={numDaysInEstimate.soon}
											control={<Radio />}
											label="Soon"
										/>
										<FormControlLabel
											value={numDaysInEstimate.kindOfSoon}
											control={<Radio />}
											label="Kind of Soon"
										/>
										<FormControlLabel
											value={numDaysInEstimate.notSoon}
											control={<Radio />}
											label="Not Soon"
										/>
									</RadioGroup>
								</FormControl>
							</label>
						</fieldset>
						<Button variant="contained" onClick={handleSubmit} type="submit">
							Add Item
						</Button>
						<Button variant="outlined" onClick={onCancel} type="reset">
							Close
						</Button>
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
						<Button variant="contained">Take me there!</Button>
					</NavLink>
				</div>
			)}
		</Paper>
	);
}
