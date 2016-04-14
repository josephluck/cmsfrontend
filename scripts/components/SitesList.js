import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';

function SitesList({
	sites
}) {
  return (
		<NoResults noResults={!sites.length}
			name="sites">
			<ul className="list">
				{sites.map((site, i) => {
					return (
						<li key={i}
							className="list-item flex">
							<span className="flex-1 ellipsis">{site.title}</span>
							<span className="flex-0 list-buttons">
								<Link to={`/sites/${site.id}/view`}>{"View"}</Link>
								<Link to={`/sites/${site.id}/edit`}>{"Edit"}</Link>
								<Link to={`/sites/${site.id}/view/delete`}>{"Delete"}</Link>
							</span>
						</li>
					)
				})}
			</ul>
		</NoResults>
  );
}

export default SitesList;