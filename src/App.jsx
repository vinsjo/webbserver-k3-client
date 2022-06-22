import React, { useContext, useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import SocketContext from './context/SocketContext';

const App = () => {
	const { socket, messages, error, sendMessage, user } =
		useContext(SocketContext);
	const [input, setInput] = useState('');
	const scrollRef = useRef(null);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (typeof sendMessage !== 'function') return;
		sendMessage(input);
		setInput('');
	};
	return (
		<div
			className="App"
			style={{
				width: '100%',
				height: '100vh',
				display: 'grid',
				justifyItems: 'center',
				padding: '1rem',
			}}
		>
			<div
				style={{
					width: '100%',
					maxWidth: '800px',
					maxHeight: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{error || !messages.length ? null : (
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: '2rem',
							justifyContent: 'space-between',
						}}
					>
						<code>
							{error
								? `error: ${error.message}`
								: !socket || !socket.connected
								? 'Connecting...'
								: user
								? `user: ${user}`
								: `Socket ID: ${socket.id}`}
						</code>
						<ul
							style={{
								listStyle: 'none',
								padding: '1rem 0.5rem',
								width: '100%',
								height: '100%',
								maxHeight: '80vh',
								borderRadius: '5px',
								backgroundColor: 'rgb(245,245,245)',
								overflow: 'scroll',
							}}
						>
							{messages.map((msg, i) => (
								<li
									key={msg.id}
									ref={
										i >= messages.length - 1
											? scrollRef
											: null
									}
									style={{
										width: '100%',
										borderBottom:
											'1px solid rgba(0,0,0,0.1)',
										padding: '0.5rem',
										backgroundColor:
											msg.user === user
												? 'rgba(50,200,0,0.2)'
												: 'none',
									}}
								>
									<div
										style={{
											width: '100%',
											display: 'flex',
											justifyContent: 'space-between',
										}}
									>
										<h5
											style={
												msg.user === user
													? { color: 'green' }
													: {}
											}
										>
											{msg.user}
										</h5>
										<code>
											{dayjs(msg.timestamp).format(
												'YY-MM-DD HH:mm:ss'
											)}
										</code>
									</div>
									<p style={{ padding: '1em 0' }}>
										{msg.content}
									</p>
								</li>
							))}
						</ul>
						<form
							onSubmit={handleSubmit}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<input
								type="text"
								value={input}
								style={{ width: '100%', padding: '0.5em 1em' }}
								onChange={(ev) => setInput(ev.target.value)}
							/>
							<button style={{ padding: '0.5em 1em' }}>
								send
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
