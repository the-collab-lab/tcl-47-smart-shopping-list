import './Home.css';
import HomeIMG from '../assets/home-Copy.png';
import { Navigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { verifyExistingList } from '../api/firebase';
import { Button, TextField } from '@mui/material';

export function Home({ createNewList, listToken, setListToken }) {
	const [token, setToken] = useState('');

	const handleClick = useCallback(() => {
		createNewList();
	}, [createNewList]);

	const formHandler = (e) => {
		const value = e.target.value;
		setToken(value);
	};

	const resetForm = () => {
		const value = '';
		setToken(value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formattedToken = token.toLowerCase();
		const tokenExists = await verifyExistingList(formattedToken);

		if (tokenExists) {
			//navigate to list if token exists
			setListToken(formattedToken);
		} else {
			//invalid token alert or error message
			alert('This list does not exist.');
		}
	};

	return (
		<div className="container">
			<div className="Home">
				{listToken && <Navigate to={'/List'} replace={true} />}
				<p className="welcome">Welcome to your smart shopping list!</p>
				<Button variant="contained" onClick={handleClick}>
					Create New List
				</Button>
			</div>
			<div className="Home">
				<p className="welcome">Join Existing List</p>
				<form onSubmit={handleSubmit} id="joinList">
					<TextField
						id="outlined-basic joinList"
						label="Enter List Name"
						variant="outlined"
						size="small"
						sx={{ width: 360 }}
						type="text"
						name="joinList"
						value={token}
						onChange={formHandler}
					/>
					<div className="actions">
						<Button variant="contained" onClick={handleSubmit}>
							Join
						</Button>
						<Button variant="contained" type="reset" onClick={resetForm}>
							Cancel
						</Button>
					</div>
				</form>
			</div>
			<div className="homeImages">
				<img src={HomeIMG} alt="honeydew" id="homeImg" />
			</div>
		</div>
	);
}
