import { ListItem } from '../components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { InputLabel, Input, InputAdornment } from '@mui/material';
import { Search, HighlightOff } from '@mui/icons-material';

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
						<InputLabel htmlFor="searchTerm">Filter Items</InputLabel>
						<Input
							sx={{ width: 350 }}
							id="searchTerm"
							value={searchTerm}
							placeholder="Start typing here..."
							onChange={onSearch}
							className="SearchBar"
							startAdornment={
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							}
							endAdornment={
								searchTerm.length ? (
									<InputAdornment position="end">
										<HighlightOff onClick={onSearchReset} type="reset" />
									</InputAdornment>
								) : null
							}
						/>
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
				</div>
			)}
		</>
	);
}
