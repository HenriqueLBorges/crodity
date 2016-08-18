import React from 'react';
import LogoutButton from './LogoutButton.jsx';
import AccountsLogin from './AccountsLogin.jsx';

const Header = () => (
	<div>
		<LogoutButton />
		<AccountsLogin />
	</div>
);

export default Header;