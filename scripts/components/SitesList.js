import React from 'react';

import { Link } from 'react-router';
import Sortable from 'react-anything-sortable';
import NoResults from 'components/NoResults';
import SortableListItem from 'components/SortableListItem';

function SitesList({
	sites,
	handleSort
}) {
  return (
		<NoResults noResults={!sites.length}
			name="sites">
			<Sortable className="list"
				onSort={handleSort}>
				{sites.map((site, i) => {
					return (
						<SortableListItem key={i}
							className="list-item flex">
							<span className="flex-1 ellipsis">{site.title}</span>
							<span className="flex-0 list-buttons">
								<Link to={`/sites/${site.id}/view`}>{"View"}</Link>
								<Link to={`/sites/${site.id}/edit`}>{"Edit"}</Link>
								<Link to={`/sites/${site.id}/view/delete`}>{"Delete"}</Link>
							</span>
						</SortableListItem>
					)
				})}
			</Sortable>
		</NoResults>
  );
}

export default SitesList;