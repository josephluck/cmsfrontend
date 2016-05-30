import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';
import Sortable from 'react-anything-sortable';
import SortableListItem from 'components/SortableListItem';

function TemplatesList({
	templates,
	onReorder
}) {
  return (
		<NoResults noResults={!templates.length}
			name="templates">
			<Sortable className="list"
				sortHandle="sortable-handle"
				onSort={onReorder}
				dynamic>
				{templates.map((template, i) => {
					return (
						<SortableListItem key={i}
							sortData={template}
							className="list-item sortable-handle flex">
							<span className="flex-1 ellipsis">{template.title}</span>
							<span className="flex-0 list-buttons">
								<Link to={`/templates/${template.id}/view`}>{"View"}</Link>
								<Link to={`/templates/${template.id}/edit`}>{"Edit"}</Link>
								<Link to={`/templates/${template.id}/view/delete`}>{"Delete"}</Link>
							</span>
						</SortableListItem>
					)
				})}
			</Sortable>
		</NoResults>
  );
}

export default TemplatesList;