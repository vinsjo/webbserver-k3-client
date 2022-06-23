import React, { useContext, useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import SocketContext from './context/SocketContext';
import './App.css';

const App = () => {
	const { socket, messages, error, sendMessage, user } =
		useContext(SocketContext);
	const [input, setInput] = useState('');
	const latestMessageRef = useRef(null);

	useEffect(() => {
		latestMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (typeof sendMessage !== 'function' || !input.length) return;
		sendMessage(input);
		setInput('');
	};
	return (
		<div className="App">
			<div className="wrapper">
				<code>
					{error
						? error.message === 'xhr poll error'
							? 'connection failed, trying to reconnect...'
							: `error: ${error.message}`
						: !socket || !socket.connected
						? 'Connecting...'
						: user
						? `user: ${user}`
						: `Socket ID: ${socket.id}`}
				</code>
				<ul className="msg-list">
					{messages.map((msg, i) => (
						<li
							className={`msg${msg.user === user ? ' mine' : ''}`}
							key={msg.id}
							ref={
								i >= messages.length - 1
									? latestMessageRef
									: null
							}
						>
							<div className="head">
								<h5 className="author">{msg.user}</h5>
								<code className="timestamp">
									{dayjs(msg.timestamp).format(
										'YY-MM-DD HH:mm:ss'
									)}
								</code>
							</div>
							<p className="content">{msg.content}</p>
						</li>
					))}
				</ul>
				<form className="msg-form" onSubmit={handleSubmit}>
					<input
						type="text"
						value={input}
						onChange={(ev) => setInput(ev.target.value)}
					/>
					<button disabled={!input.length}>send</button>
				</form>
			</div>
		</div>
	);
};

export default App;
