import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data, listToken }) {
	const [searchTerm, setSearchTerm] = useState('');

	const onSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const onSearchReset = () => {
		setSearchTerm('');
	};

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	// TODO - Use navigation similar to in Home.jsx to navigate to home page if no token or token is null
	return (
		<>
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
		</>
	);
}
