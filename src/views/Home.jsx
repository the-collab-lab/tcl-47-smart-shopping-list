import './Home.css';
import HomeIMG from '../assets/home.png';
import { Navigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { verifyExistingList } from '../api/firebase';
import { Button, TextField, Typography, Paper } from '@mui/material';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

export function Home({ createNewList, listToken, setListToken }) {
	const [token, setToken] = useState('');

	const handleClick = useCallback(() => {
		createNewList();
	}, [createNewList]);

	const formHandler = (e) => {
		const value = e.target.value;
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
				<Typography
					variant="h4"
					sx={{
						fontWeight: 'bold',
						textShadow: 'rgba(0, 0, 0, 0.15) 0 1.5px',
						mt: 2,
						mb: 3,
					}}
				>
					Welcome to Your Smart Shopping List!
				</Typography>
			</div>
			<Paper sx={{ py: 0.5, px: 1.75, width: 400 }} elevation={3}>
				<div className="Home">
					<Typography
						variant="h5"
						sx={{
							fontWeight: 'bold',
							textShadow: 'rgba(0, 0, 0, 0.15) 0 1.5px',
							my: 1,
						}}
					>
						Create New List
					</Typography>
					<Button variant="contained" onClick={handleClick}>
						Create
					</Button>
					<Typography
						variant="subtitle1"
						sx={{
							fontWeight: 'bold',
							textShadow: 'rgba(0, 0, 0, 0.15) 0 1.5px',
							mt: 1.5,
						}}
					>
						OR
					</Typography>
					<Typography
						variant="h5"
						sx={{
							fontWeight: 'bold',
							textShadow: 'rgba(0, 0, 0, 0.15) 0 1.5px',
							my: 1,
						}}
					>
						Join Existing List
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							id="outlined-basic joinList"
							label="List Name..."
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
						</div>
					</form>
				</div>
			</Paper>
			<div className="homeImages">
				<img src={HomeIMG} alt="honeydew" id="homeImg" />
			</div>
			<ArchivalNoticeModal />
		</div>
	);
}
