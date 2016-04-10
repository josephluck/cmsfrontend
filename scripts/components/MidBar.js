import React from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import PageActions from 'components/PageActions';

function MidBar({
	breadcrumbs = [],
	actions = []
}) {
  return (
  	<div>
			<div className="mid-bar">
				<div className="subnav container flex vertical-align">
					<div className="flex-1">
						<Breadcrumbs breadcrumbs={breadcrumbs} />
					</div>
					<PageActions actions={actions} />
				</div>
			</div>
			<hr />
		</div>
  );
}

export default MidBar;