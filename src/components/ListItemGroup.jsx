import React from 'react';
import { ListItem } from './ListItem';
import './ListItemGroup.css';

export function ListItemGroup({
	listItems,
	listToken,
	groupUrgency,
	createAlert,
}) {
	return (
		<ul>
			<hr />
			<h3 className="Category">{groupUrgency + ` (${listItems.length})`}</h3>
			{listItems &&
				listItems.map((item, i) => (
					<ListItem
						key={item.name + i}
						{...item}
						item={item}
						listToken={listToken}
						urgencyCategory={groupUrgency}
						createAlert={createAlert}
					/>
				))}
		</ul>
	);
}
