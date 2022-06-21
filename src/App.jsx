import React, { useContext } from 'react';
import { SocketContext } from './context/SocketProvider';

const App = () => {
	const { socket, messages, users } = useContext(SocketContext);
	return (
		<>
			<code>{!socket ? 'Loading...' : `Socket ID: ${socket.id}`}</code>
			<div
				style={{
					padding: '2rem 0',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h3>Messages:</h3>
				<ul style={{ listStyle: 'none', padding: '2rem 0' }}>
					{messages.map((msg, i) => (
						<li key={i}>{msg}</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default App;
