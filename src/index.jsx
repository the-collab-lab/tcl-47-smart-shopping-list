import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { theme } from './theme/theme';

import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
);
