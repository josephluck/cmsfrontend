import React from 'react';
import { browserHistory } from 'react-router';

import Breadcrumbs from 'components/Breadcrumbs';
import PageActions from 'components/PageActions';
import {Link} from 'react-router';
import Store from 'store/Store';

function MidBar({
	breadcrumbs = [],
	actions = [],
	current_path
}) {
  return (
		<div className="subnav container flex vertical-align flex-0">
			<div className="flex-1">
				<Breadcrumbs breadcrumbs={breadcrumbs} />
			</div>
			<button className="transparent">{"-"}</button>
			{current_path ?
				<span>
	 					<Link className="button"
	 						to={`${current_path}/access/jquery`}>
	 						{"Access"}
	 					</Link>
	 				</span>
				: null
			}
			<PageActions actions={actions} />
		</div>
  );
}

export default MidBar;