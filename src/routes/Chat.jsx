import React from 'react';
import UserRequired from '../components/UserRequired';
import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import ChatContainer from '../components/ChatContainer';

const Chat = () => {
	return (
		<UserRequired>
			<ChatContainer />
		</UserRequired>
	);
};

export default Chat;
