import './Home.css';
import { Navigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

export function Home({ createNewList, listToken }) {
	const [token, setToken] = useState('');

	const handleClick = useCallback(() => {
		createNewList();
	}, [createNewList]);

	const formHandler = (e) => {
		const value = e.target.value;
		setToken((token) => value);
	};

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (itemName === '') {
	// 		alert('Please enter the name of your item.');
	// 	} else {
	// 		// changes string to number, as required by addItem function
	// 		const daysUntilNextPurchase = +estimate;
	// 		// uses addItem function imported from api; this takes 2 arguments: the user's token and the item object containing item name and numDaysInEstimate of next purchase date
	// 		addItem(token, { itemName, daysUntilNextPurchase });
	// 		alert(`You've added ${itemName} to your shopping list!`);
	// 		//Clear Form Data
	// 		setFormData(initialState);
	// 	}
	// };

	return (
		<div>
			<div className="Home">
				{listToken && <Navigate to={'/List'} replace={true} />}
				<p>Welcome to your smart shopping list!</p>
				<button onClick={handleClick}>Create New List</button>
			</div>
			<div>
				<h1>Join Existing List</h1>
				<form>
					<label htmlFor="joinList">Enter Token:</label>
					<input
						type="text"
						name="joinList"
						id="joinList"
						value={token}
						onChange={formHandler}
					/>
					<button>Join List</button>
				</form>
			</div>
		</div>
	);
}
