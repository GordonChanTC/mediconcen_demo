import React from 'react';
import { TokenStorage } from './src/token/Token';
import PageRouter from './src/components/PageRouter';

const App = props => {
	return (
		<PageRouter />
	);
}

export default TokenStorage(App);