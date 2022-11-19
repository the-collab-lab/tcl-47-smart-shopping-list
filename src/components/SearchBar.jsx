import { InputLabel, Input, InputAdornment } from '@mui/material';
import { Search, HighlightOff } from '@mui/icons-material';

export function SearchBar({ searchTerm, setSearchTerm }) {
	const onSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const onSearchReset = () => {
		setSearchTerm('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputLabel htmlFor="searchTerm">Filter Items</InputLabel>
			<Input
				sx={{ width: 350 }}
				id="searchTerm"
				value={searchTerm}
				placeholder="Start typing here..."
				onChange={onSearch}
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
	);
}
