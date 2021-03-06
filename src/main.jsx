import React from 'react';
import ReactDOM from 'react-dom/client';
import SocketProvider from './providers/SocketProvider';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SocketProvider>
			<App />
		</SocketProvider>
	</React.StrictMode>
);
