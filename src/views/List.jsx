import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import { ListItemGroup } from '../components/ListItemGroup';
import { SearchBar } from '../components';
import { urgencyCategory } from '../utils';

export function List({ data, listToken }) {
	const sortedData = comparePurchaseUrgency(data);
	const [searchTerm, setSearchTerm] = useState('');

	const filteredData = sortedData.map((category) => {
		return category.filter((item) => {
			return item.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
	});

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
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					{!!filteredData.length || !searchTerm ? (
						filteredData.map((category, i) => (
							<ListItemGroup
								key={`Category${i}`}
								listItems={category}
								listToken={listToken}
								groupUrgency={urgencyCategory[i].label}
							/>
						))
					) : (
						<p>No items match your search.</p>
					)}
				</div>
			)}
		</>
	);
}
