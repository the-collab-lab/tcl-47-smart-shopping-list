import './Home.css';
import { Navigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

export function Home({ createNewList, listToken }) {
	const [token, setToken] = useState('');

	const handleClick = useCallback(() => {
		createNewList();
	}, [createNewList]);

	const formHandler = (e) => {
		const value = e.target.value;
		setToken((token) => value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (token === listToken) {
			//navigate to list if token exists
		} else {
			//invalid token alert or error message
		}
	};

	return (
		<div>
			<div className="Home">
				{listToken && <Navigate to={'/List'} replace={true} />}
				<p>Welcome to your smart shopping list!</p>
				<button onClick={handleClick}>Create New List</button>
			</div>
			<div>
				<h1>Join Existing List</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="joinList">Enter Token:</label>
					<input
						type="text"
						name="joinList"
						id="joinList"
						value={token}
						onChange={formHandler}
					/>
					<button>Join List</button>
				</form>
			</div>
		</div>
	);
}
