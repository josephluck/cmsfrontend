import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import PersistentStorage from 'utils/PersistentStorage';
import Api from 'utils/Api';

import { Link } from 'react-router';

function Profile({
	user,
	onLogoutClick,
	dropdownOpen,
	openDropdown,
	closeDropdown
}) {
  return (
  	<span>
  		{user.email}
  		{dropdownOpen ?
  			<span>
				  <a href=""
				  	className="left-margin"
				  	onClick={closeDropdown.bind(true)}>
				  	{"Close"}
				  </a>
    			<div className="dropdown-menu">
  			  	<Link to="/settings/view"
  			  		className="menu-item"
  			  		onClick={closeDropdown}>
  			  		{"Settings"}
  			  	</Link>
  			  	<Link to="/sites/view"
  			  		className="menu-item"
  			  		onClick={closeDropdown}>
  			  		{"Sites"}
  			  	</Link>
  			  	<Link to="/users/view"
  			  		className="menu-item"
  			  		onClick={closeDropdown}>
  			  		{"Users"}
  			  	</Link>
  			  	<a href=""
  			  		className="menu-item"
  			  		onClick={onLogoutClick}>
  			  		{"Logout"}
  			  	</a>
  			  </div>
				</span>
		  	:
		  	<a href=""
		  		className="left-margin"
		  		onClick={openDropdown}>
		  		{"Menu"}
		  	</a>
		  }
	  </span>
  );
}

function onLogoutClick(e) {
	e.preventDefault();
	Api.destroy({
		url: {
			name: 'login'
		},
		payload: {
			auth_token: PersistentStorage.get('token')
		}
	}).then((res) => {
		Api.removeToken();
		Store.get().user.reset({});
		Store.get().set({
			profileDropdownOpen: false
		});
		Api.redirect("/login");
	}, (err) => {
		debugger
	})
}

function openDropdown(e) {
	e.preventDefault();
	Store.get().set({
		profileDropdownOpen: true
	})
}

function closeDropdown(e, rid, should_prevent) {
	if (should_prevent) {
		e.preventDefault();
	};
	Store.get().set({
		profileDropdownOpen: false
	})
}

export default warmUp(Profile, [
	['user', 'user'],
	['dropdownOpen', 'profileDropdownOpen'],
	['onLogoutClick', onLogoutClick],
	['openDropdown', openDropdown],
	['closeDropdown', closeDropdown]
]);