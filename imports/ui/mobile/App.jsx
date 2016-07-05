import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import AccountsLogin from './AccountsLogin.jsx';

const App = ({content}) => (
	<div>
		<AccountsUIWrapper />
		<AccountsLogin />
		{content}
	</div>
);

export default App;