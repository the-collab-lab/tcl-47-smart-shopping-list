import { createTheme } from '@mui/material';
import { grey, lightGreen } from '@mui/material/colors';

export const theme = createTheme({
	palette: {
		primary: {
			main: lightGreen[600],
			secondary: grey[500],
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				input: {
					fontSize: '1.5rem',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 45,
					fontWeight: 700,
					fontSize: '1.25rem',
					margin: '5px',
					'&.MuiButton-contained': {
						fontWeight: 700,
						color: '#fff',
					},
				},
			},
		},
	},
});
