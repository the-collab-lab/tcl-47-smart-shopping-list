import { useState } from 'react';

import { Box, Paper, Typography } from '@mui/material';

import { AddItem } from '../components';
import { SearchBar } from '../components';
import { ListItemGroup } from '../components';
import { AddButton } from '../components';

import { comparePurchaseUrgency } from '../api/firebase';
import { urgencyCategory } from '../utils';

export function List({ data, listToken, createAlert }) {
	const sortedData = comparePurchaseUrgency(data);
	const [searchTerm, setSearchTerm] = useState('');
	const [addItem, setAddItem] = useState(false);

	const toggleAddItem = () => setAddItem(!addItem);

	const filteredData = sortedData.map((category) => {
		return category.filter((item) => {
			return item.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
	});

	// TODO - Use navigation similar to in Home.jsx to navigate to home page if no token or token is null
	return (
		<Box display="flex" flexDirection="column">
			{!data.length ? (
				addItem ? (
					<AddItem
						data={data}
						setAddItem={setAddItem}
						createAlert={createAlert}
					/>
				) : (
					<Paper
						sx={{
							py: 2,
							px: 5,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
						}}
						elevation={3}
					>
						<Typography variant="h4" mb={2}>
							🤔 Hmmmm...looks like you have an empty list! Let's add your first
							item!
						</Typography>
						<AddButton toggleAddItem={toggleAddItem} />
					</Paper>
				)
			) : (
				<div>
					{addItem ? (
						<AddItem data={data} setAddItem={setAddItem} />
					) : (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								alignContent: 'center',
							}}
						>
							<SearchBar
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
							/>
							<AddButton toggleAddItem={toggleAddItem} />
						</Box>
					)}
					{!!filteredData.length || !searchTerm ? (
						filteredData.map((category, i) => (
							<ListItemGroup
								key={`Category${i}`}
								listItems={category}
								listToken={listToken}
								groupUrgency={urgencyCategory[i].label}
								createAlert={createAlert}
							/>
						))
					) : (
						<p>No items match your search.</p>
					)}
				</div>
			)}
		</Box>
	);
}
