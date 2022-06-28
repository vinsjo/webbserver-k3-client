import React, { useRef, useEffect, useContext } from 'react';
import styles from './MessageList.module.css';
import SocketContext from '../context/SocketContext';
import dayjs from 'dayjs';

const MessageList = () => {
	const { messages, user } = useContext(SocketContext);
	const lastMessageRef = useRef(null);
	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);
	return (
		<ul className={styles.list}>
			{messages.map((msg, i) => (
				<li
					className={[
						styles.msg,
						user?.id && msg.user?.id === user?.id
							? styles.mine
							: '',
					].join(' ')}
					key={msg.id}
					ref={i >= messages.length - 1 ? lastMessageRef : null}
				>
					<div className={styles.head}>
						<h5 className={styles.author}>{msg.user?.name}</h5>
						<code className={styles.timestamp}>
							{dayjs(msg.timestamp).format('YY-MM-DD HH:mm:ss')}
						</code>
					</div>
					<p className={styles.content}>{msg.text}</p>
				</li>
			))}
		</ul>
	);
};

export default MessageList;
