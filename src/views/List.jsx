import { ListItem } from '../components';

export function List({ data }) {
	// TODO - Use navigation similar to in Home.jsx to navigate to home page if no token or token is null
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
