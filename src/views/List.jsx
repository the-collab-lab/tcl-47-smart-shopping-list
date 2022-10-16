import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
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

	return (
		<>
			<form>
				<label htmlFor="searchTerm">Filter list items</label>
				<input
					type="text"
					value={searchTerm}
					id="searchTerm"
					placeholder="Start typing here..."
					onChange={onSearch}
				></input>
				{searchTerm === '' ? null : (
					<button onClick={onSearchReset} type="reset">
						Reset
					</button>
				)}
				{/* @TODO Pressing 'enter' should not activate reset */}
			</form>
			{
				filteredData.length > 0 ? (
					<ul>
						{filteredData.map((item, i) => (
							<ListItem key={item.name + i} {...item} />
						))}
					</ul>
				) : (
					<p>No items match your search.</p>
				)
				// @TODO Prevent this from displaying at initial load of List view
			}
		</>
	);
}
