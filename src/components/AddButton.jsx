import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

export function AddButton({ toggleAddItem }) {
	return (
		<Fab
			color="primary"
			size="small"
			aria-label="Add Item Toggle"
			onClick={toggleAddItem}
			sx={{ zIndex: 1 }}
		>
			<Add fontSize="large" style={{ color: '#fff' }} />
		</Fab>
	);
}
