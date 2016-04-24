import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';

function TemplatesList({
	templates
}) {
  return (
		<NoResults noResults={!templates.length}
			name="templates">
			<ul className="list">
				{templates.map((template, i) => {
					return (
						<li key={i}
							className="list-item flex">
							<span className="flex-1 ellipsis">{template.title}</span>
							<span className="flex-0 list-buttons">
								<Link to={`/templates/${template.id}/view`}>{"View"}</Link>
								<Link to={`/templates/${template.id}/edit`}>{"Edit"}</Link>
								<Link to={`/templates/${template.id}/view/delete`}>{"Delete"}</Link>
							</span>
						</li>
					)
				})}
			</ul>
		</NoResults>
  );
}

export default TemplatesList;