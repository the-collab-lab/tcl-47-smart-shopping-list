import React from 'react';
import { ListItem } from './ListItem';
import './ListItemGroup.css';

export function ListItemGroup({ listItems, listToken, urgencyCategory }) {
	const groupUrgency = listItems[0].isChecked
		? 'Purchased'
		: urgencyCategory[listItems[0].urgencyCategory];

	return (
		<ul>
			<hr />
			<h3 className="Category">{groupUrgency}</h3>
			{listItems.map((item, i) => (
				<ListItem
					key={item.name + i}
					{...item}
					item={item}
					listToken={listToken}
					urgencyCategory={urgencyCategory}
				/>
			))}
		</ul>
	);
}
