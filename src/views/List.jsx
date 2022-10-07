import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<ul>
				{data.map((item, i) => (
					<ListItem key={item.name + i} {...item} />
				))}
			</ul>
		</>
	);
}
