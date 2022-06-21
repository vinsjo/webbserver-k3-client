import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import SocketProvider from './context/SocketProvider';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SocketProvider>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</SocketProvider>
	</React.StrictMode>
);
