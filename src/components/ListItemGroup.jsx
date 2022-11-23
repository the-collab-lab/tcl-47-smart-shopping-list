import React from 'react';
import { ListItem } from './ListItem';
import './ListItemGroup.css';
import { Paper, Typography } from '@mui/material';

export function ListItemGroup({ listItems, listToken, groupUrgency }) {
	return (
		<ul>
			<Paper
				sx={{
					py: 2,
					px: 5,
					my: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'left',
					textAlign: 'left',
				}}
				elevation={3}
			>
				<Typography variant="h3">
					<h3 className="Category">
						{groupUrgency + ` (${listItems.length})`}
					</h3>
				</Typography>
				{listItems &&
					listItems.map((item, i) => (
						<ListItem
							key={item.name + i}
							{...item}
							item={item}
							listToken={listToken}
							urgencyCategory={groupUrgency}
						/>
					))}
			</Paper>
		</ul>
	);
}
