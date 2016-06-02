import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';
import Reorder from 'react-reorder';

function TemplatesList({
	templates,
	onReorder
}) {
  return (
		<NoResults noResults={!templates.length}
			name="templates">
			<Reorder
			  itemKey='id'
			  lock='horizontal'
			  holdTime='100'
			  list={templates.toJS()}
			  template={({item}) => {
			  	return (
			  		<div className="flex">
			  			<span className="flex-1 ellipsis">{item.title}</span>
			  			<span className="flex-0 list-buttons">
			  				<Link to={`/templates/${item.id}/view`}>{"View"}</Link>
			  				<Link to={`/templates/${item.id}/edit`}>{"Edit"}</Link>
			  				<Link to={`/templates/${item.id}/view/delete`}>{"Delete"}</Link>
			  			</span>
			  		</div>
			  	)
			  }}
			  callback={onReorder}
			  listClass='list'
			  itemClass='flex list-item'
			  selectedKey='id'
			  disableReorder={false}>
			</Reorder>
		</NoResults>
  );
}

export default TemplatesList;