import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem() {
	const initialState = { itemName: '', estimate: '7' };
	const [formData, setFormData] = useState(initialState);
	const { itemName, estimate } = formData;

	const formHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log(formData);
	// 	let dateToPurchase = Number(estimate);
	// 	console.log(dateToPurchase)
	// 	console.log(typeof(dateToPurchase));
	// 	addDoc("my test list", {itemName, dateToPurchase});
	// 	alert(`You've added ${itemName} to your shopping list.`);
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		if (itemName === '') {
			alert('Please enter the name of your item.');
		} else {
			// changing string to number, as required by addItem function
			const daysUntilNextPurchase = +estimate;
			console.log(typeof daysUntilNextPurchase);
			console.log('my test list', { itemName, daysUntilNextPurchase });
			addItem('my test list', { itemName, daysUntilNextPurchase });
			alert(`You've added ${itemName} to your shopping list!`);
		}
	};

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
