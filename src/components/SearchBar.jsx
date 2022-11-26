import { Box, InputLabel, Input, InputAdornment } from '@mui/material';
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
		<Box alignSelf="center">
			<form onSubmit={handleSubmit}>
				<InputLabel htmlFor="searchTerm">Filter Items</InputLabel>
				<Input
					id="searchTerm"
					value={searchTerm}
					placeholder="Start typing here..."
					onChange={onSearch}
					sx={{ width: '275px' }}
					startAdornment={
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					}
					endAdornment={
						searchTerm.length > 0 && (
							<InputAdornment position="end">
								<HighlightOff onClick={onSearchReset} type="reset" />
							</InputAdornment>
						)
					}
				/>
			</form>
		</Box>
	);
}
