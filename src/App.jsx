import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AddItem, Home, Layout, List } from './views';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';

import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function App() {
	const [data, setData] = useState([]);
	/**
	 * Here, we're using a custom hook to create `listToken` and a function
	 * that can be used to update `listToken` later.
	 *
	 * `listToken` is `my test list` by default so you can see the list
	 * of items that was prepopulated for this project.
	 * You'll later set it to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when you allow a user
	 * to create and join a new list.
	 */
	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	const createNewList = useCallback(() => {
		const newToken = generateToken();
		setListToken(newToken);
	}, [setListToken]);

	useEffect(() => {
		if (!listToken) return;
		/**
		 * streamListItems` takes a `listToken` so it can commuinicate
		 * with our database; then calls a callback function with
		 * a `snapshot` from the database.
		 *
		 * Refer to `api/firebase.js`.
		 */

		return streamListItems(listToken, (snapshot) => {
			/**
			 * Read the documents in the snapshot and do some work
			 * on them, so we can save them in our React state.
			 *
			 * Refer to `api/firebase.js`
			 */
			const nextData = getItemData(snapshot);

			/** Finally, we update our React state. */
			setData(nextData);
		});
	}, [listToken]);

	//Create alert to be used throughout the app
	const [alert, setAlert] = useState({ msg: null, severity: null });

	const clearAlert = () => {
		setAlert({
			msg: null,
			severity: null,
		});
	};

	const createAlert = (msg, severity) => {
		setAlert(() => ({
			msg: msg,
			severity: severity,
		}));
		//Clear alert after 5 seconds
		setTimeout(clearAlert, 5000);
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout alert={alert} />}>
					<Route
						index
						element={
							<Home
								listToken={listToken}
								createNewList={createNewList}
								setListToken={setListToken}
								createAlert={createAlert}
							/>
						}
					/>
					<Route
						path="/list"
						element={
							<List
								data={data}
								listToken={listToken}
								createAlert={createAlert}
							/>
						}
					/>
					<Route
						path="/add-item"
						element={<AddItem data={data} createAlert={createAlert} />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}
