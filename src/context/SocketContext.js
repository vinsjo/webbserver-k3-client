import React from 'react';

const SocketContext = React.createContext({
	socket: null,
	messages: [],
	users: [],
});

export default SocketContext;
