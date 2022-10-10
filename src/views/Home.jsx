import './Home.css';
import { Navigate } from 'react-router-dom';

export function Home({ createNewList, listToken }) {
	const handleClick = () => {
		createNewList();
	};

	return (
		<div className="Home">
			{listToken != null && <Navigate to={'/List'} replace={true} />}
			<p>Welcome to your smart shopping list!</p>
			<button onClick={handleClick}>Create New List</button>
		</div>
	);
}
