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

	// default form behavior was causing reload of page when user pushes enter; this prevents that
	// still feels like a weird user experience when pushing enter and nothing changes/happens...maybe give a simple feedback message, i.e. 'here are your matching items:'
	const handleSubmit = (e) => {
		e.preventDefault();
	};

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
				></input>
				{searchTerm === '' ? null : (
					<button onClick={onSearchReset} type="reset">
						Reset
					</button>
				)}
			</form>
			{/* added || !searchTerm to line 43; if there is no searchTerm, the user will never see the message on line 51 */}
			{filteredData.length > 0 || !searchTerm ? (
				<ul>
					{filteredData.map((item, i) => (
						<ListItem key={item.name + i} {...item} />
					))}
				</ul>
			) : (
				<p>No items match your search.</p>
			)}
		</>
	);
}
