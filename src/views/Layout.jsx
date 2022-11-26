import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

import './Layout.css';
import { Alert } from '@mui/material';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout({ alert }) {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<Navbar />
				</header>
				{alert.msg ? (
					<Alert
						severity={alert.severity}
						sx={{ display: 'flex', alignItems: 'center', fontSize: 'small' }}
					>
						{alert.msg}
					</Alert>
				) : null}
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<NavLink to="/" className="Nav-link">
						Home
					</NavLink>
					<NavLink to="/list" className="Nav-link">
						List
					</NavLink>
				</nav>
			</div>
		</>
	);
}
