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
	let dropdown_class = "dropdown-menu";
	let dropdown_wrap_class = "dropdown-menu-wrap";

	if (dropdownOpen) {
		dropdown_class += " open";
		dropdown_wrap_class += " open";
	}
  return (
  	<span className={dropdown_wrap_class}>
			<span>
				  <a href=""
				  	className="left-margin"
				  	onClick={(e) => {
				  		e.preventDefault();
				  		if (dropdownOpen) {
				  			closeDropdown();
				  		} else {
				  			openDropdown();
				  		}
				  	}}>
				  	{dropdownOpen ?
				  		"Close"
				  		:
				  		"Menu"
				  	}
				  	<span className="ss-navigateup"></span>
				  </a>
  			<div className={dropdown_class}>
			  	<Link to="/sites/view"
			  		className="menu-item"
			  		onClick={closeDropdown}>
			  		{"Sites"}
			  	</Link>
			  	<Link to="/templates/view"
			  		className="menu-item"
			  		onClick={closeDropdown}>
			  		{"Templates"}
			  	</Link>
			  	<Link to="/users/view"
			  		className="menu-item"
			  		onClick={closeDropdown}>
			  		{"Users"}
			  	</Link>
			  	<Link to="/settings/view"
			  		className="menu-item"
			  		onClick={closeDropdown}>
			  		{"Settings"}
			  	</Link>
			  	<a href=""
			  		className="menu-item"
			  		onClick={onLogoutClick}>
			  		{"Logout"}
			  	</a>
			  </div>
			</span>
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

function openDropdown() {
	Store.get().set({
		profileDropdownOpen: true
	})
}

function closeDropdown() {
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