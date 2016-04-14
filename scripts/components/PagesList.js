import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';

function PagesList({
	pages
}) {
  return (
		<NoResults noResults={!pages.length}
			name="pages">
			<ul className="list">
				{pages.map((page, i) => {
					return (
						<li key={i}
							className="list-item flex">
							<span className="flex-1 ellipsis">{page.title}</span>
							<span className="flex-0 list-buttons">
								<Link to={`/pages/${page.id}/view`}>{"View"}</Link>
								<Link to={`/pages/${page.id}/edit`}>{"Edit"}</Link>
								<Link to={`/pages/${page.id}/view/delete`}>{"Delete"}</Link>
							</span>
						</li>
					)
				})}
			</ul>
		</NoResults>
  );
}

export default PagesList;