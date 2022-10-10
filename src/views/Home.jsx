import './Home.css';
import { Navigate } from 'react-router-dom'; // Not sure if we want to use Navigate or useNavigate.

export function Home({ createNewList, listToken }) {
	// const navigateTo = useNavigate(); // If we use 'useNavigate'
	const handleClick = () => {
		createNewList();
	};

	return (
		<div className="Home">
			{/* If the list token does not equal null, navigate to /list else, render the rest */}
			{listToken != null && <Navigate to={'/List'} replace={true} />}
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={handleClick}>Create New List</button>
		</div>
	);
}
