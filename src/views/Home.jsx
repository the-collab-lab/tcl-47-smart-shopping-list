import './Home.css';
import { Navigate } from 'react-router-dom';
import { useCallback } from 'react';

export function Home({ createNewList, listToken }) {
	const handleClick = useCallback(() => {
		createNewList();
	}, [createNewList]);

	return (
		<div className="Home">
			{listToken && <Navigate to={'/List'} replace={true} />}
			<p>Welcome to your smart shopping list!</p>
			<button onClick={handleClick}>Create New List</button>
		</div>
	);
}
