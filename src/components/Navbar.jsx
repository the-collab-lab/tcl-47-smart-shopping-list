import { Box } from '@mui/system';
import { theme } from '../theme/theme';
import HoneyDo from '../assets/HoneyDo.png';

export function Navbar() {
	return (
		<Box
			elevation={3}
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around',
				height: 64,
				backgroundColor: theme.palette.primary.main,
				py: 1,
			}}
		>
			<img src={HoneyDo} alt="HoneyDo Banner" />
		</Box>
	);
}
