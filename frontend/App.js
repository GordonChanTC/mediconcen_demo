import React, { useEffect, useReducer, useState } from 'react';
import LoginContext, { LoginInitState, LoginReducer } from './src/components/Login/LoginContext';
import PageRouter from './src/components/PageRouter';

const App = props => {
	const [LoginState, LoginDispatch] = useReducer(LoginReducer, LoginInitState);

	return (
		<LoginContext.Provider value={[LoginState, LoginDispatch]}>
			<PageRouter />
		</LoginContext.Provider>
	);
}

export default App;