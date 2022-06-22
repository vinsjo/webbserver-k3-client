import dayjs from 'dayjs';
import React, { useContext } from 'react';
import SocketContext from './context/SocketContext';

const App = () => {
	const { socket, messages, error } = useContext(SocketContext);
	return (
		<div className="App" style={{ height: '100vh', display: 'grid' }}>
			<div style={{ width: '100%', maxWidth: '800px' }}>
				<code>
					{error
						? `error: ${error.message}`
						: !socket || !socket.connected
						? 'Connecting...'
						: `Socket ID: ${socket.id}`}
				</code>
				{error || !messages.length ? null : (
					<div
						style={{
							width: '100%',
							padding: '2rem 0',
							display: 'flex',
							flexDirection: 'column',
							maxHeight: '75vh',
						}}
					>
						<code style={{ fontSize: '1.5rem' }}>Messages:</code>
						<ul style={{ listStyle: 'none', padding: '2rem 0' }}>
							{messages.map(
								({ id, content, timestamp, user }) => (
									<li
										key={id}
										style={{
											padding: '1rem 0',
											width: '100%',
										}}
									>
										<div
											style={{
												width: '100%',
												padding: '1rem 0',
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<h5>{user}</h5>
											<code>
												{dayjs(timestamp).format(
													'YY-MM-DD HH:mm:ss'
												)}
											</code>
										</div>

										<p>{content}</p>
									</li>
								)
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
