import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem } from '../components';
import { SearchBar } from '../components';

export function List({ data, listToken }) {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

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
						<ul>
							{filteredData.map((item, i) => (
								<ListItem
									key={item.name + i}
									{...item}
									item={item}
									listToken={listToken}
								/>
							))}
						</ul>
					) : (
						<p>No items match your search.</p>
					)}
				</div>
			)}
		</>
	);
}
