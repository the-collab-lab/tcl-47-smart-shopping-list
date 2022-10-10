import { useState } from 'react';

export function AddItem() {
	const initialState = { name: '', estimate: '' };
	const [formData, setFormData] = useState(initialState);
	const { itemName, estimate } = formData;

	const formHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		// const name = e.target.name;
		// const value = e.target.value;
		// setFormData(formData => ({...formData, [name] : value}))
	};

	return (
		<div>
			<h1>Add a New Item</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">Name:</label>
				<input
					type="text"
					name="itemName"
					value={itemName}
					onChange={formHandler}
				/>

				<fieldset>
					<legend>How soon will you buy this again?</legend>
					<input
						type="radio"
						value="7"
						name="soon"
						onChange={formHandler}
						checked={formData.estimate === 7}
					/>
					<label htmlFor="soon">Soon</label>
					<input
						type="radio"
						value="14"
						name="kindOfSoon"
						onChange={formHandler}
						checked={formData.estimate === 14}
					/>
					<label htmlFor="kindOfSoon">Kind of Soon</label>
					<input
						type="radio"
						value="30"
						name="notSoon"
						onChange={formHandler}
						checked={formData.estimate === 30}
					/>
					<label htmlFor="notSoon">Not Soon</label>
				</fieldset>
				<button>Add Item</button>
			</form>
		</div>
	);
}
