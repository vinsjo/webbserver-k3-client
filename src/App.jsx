import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Start, RoomSelection, Chat, NotFound } from './routes';
import Layout from './components/Layout';

const App = () => {
	return (
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<Start />} />
						<Route path="chat" element={<RoomSelection />} />
						<Route path="chat/:room_id" element={<Chat />} />
						<Route element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
};

export default App;
