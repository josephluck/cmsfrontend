import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';

function UsersList({
	currentUser,
	users
}) {
  return (
		<NoResults noResults={!users.length || !currentUser.id}
			name="users">
			<ul className="list">
				{users.map((user, i) => {
					if (user.api_consumer !== true) {
						return (
							<li key={i}
								className="list-item flex">
								<span className="flex-1 ellipsis">{user.email}</span>
								<span className="flex-0 list-buttons">
									{currentUser.id !== user.id ?
										<Link to={`users/view/${user.id}/delete`}>{"Delete"}</Link>
										:
										<span>
											<Link to={`users/${user.id}/edit`}>{"Change password"}</Link>
										</span>
									}
								</span>
							</li>
						)
					} else {
						return null
					}
				})}
			</ul>
		</NoResults>
  );
}

export default UsersList;