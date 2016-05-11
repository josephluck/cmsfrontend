import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';

function UseTemplatesList({
	templates,
	onUseClick
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
								<a href=""
									onClick={(e) => {
										e.preventDefault();
										onUseClick(template);
									}}>
									{"Use"}
								</a>
							</span>
						</li>
					)
				})}
			</ul>
		</NoResults>
  );
}

export default UseTemplatesList;