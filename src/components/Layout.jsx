import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './Layout.module.css';

const Layout = () => {
	return (
		<div className={styles['page-wrapper']}>
			<Header />
			<main className={styles.content}>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
