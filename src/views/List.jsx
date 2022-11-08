import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import { ListItemGroup } from '../components/ListItemGroup';

const itemUrgencyCategory = {
	0: 'Overdue',
	1: 'Soon',
	2: 'Kind of Soon',
	3: 'Not Soon',
	4: 'Inactive',
	5: 'Purchased',
};

export function List({ data, listToken }) {
	const sortedData = comparePurchaseUrgency(data);
	const [searchTerm, setSearchTerm] = useState('');

	const onSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const onSearchReset = () => {
		setSearchTerm('');
	};

	const filteredData = sortedData.map((category) => {
		return category.filter((item) => {
			return item.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	// TODO - Use navigation similar to in Home.jsx to navigate to home page if no token or token is null
	return (
		<>
			{!data.length ? (
				<div>
					<h2>Hmmmm...looks like you have an empty list! 🤔 </h2>
					<NavLink to="/add-item">
						<button>Start List</button>
					</NavLink>
				</div>
			) : (
				<div>
					<form onSubmit={handleSubmit}>
						<label htmlFor="searchTerm">Filter list items</label>
						<input
							type="text"
							value={searchTerm}
							id="searchTerm"
							placeholder="Start typing here..."
							onChange={onSearch}
						/>
						{!!searchTerm && (
							<button onClick={onSearchReset} type="reset">
								Reset
							</button>
						)}
					</form>
					{!!filteredData.length || !searchTerm ? (
						filteredData.map(
							(category, i) =>
								category.length > 0 && (
									<ListItemGroup
										key={`Category${i}`}
										listItems={category}
										listToken={listToken}
										urgencyCategory={itemUrgencyCategory}
									/>
								),
						)
					) : (
						<p>No items match your search.</p>
					)}
				</div>
			)}
		</>
	);
}
