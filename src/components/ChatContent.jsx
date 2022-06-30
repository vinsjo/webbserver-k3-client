import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import styles from './ChatContent.module.css';

const ChatContent = () => {
	return (
		<div className={styles.container}>
			<MessageList />
			<MessageInput />
		</div>
	);
};

export default ChatContent;
