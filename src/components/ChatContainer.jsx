import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import styles from './ChatContainer.module.css';

const ChatContainer = () => {
	return (
		<div className={styles.container}>
			<MessageList />
			<MessageInput />
		</div>
	);
};

export default ChatContainer;
