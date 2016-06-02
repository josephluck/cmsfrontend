import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';
import Reorder from 'react-reorder';

function SitesList({
	sites,
	onReorder
}) {
  return (
		<NoResults noResults={!sites.length}
			name="sites">
			<Reorder
			  itemKey='id'
			  lock='horizontal'
			  holdTime='100'
			  list={sites.toJS()}
			  template={({item}) => {
			  	return (
			  		<div className="flex">
			  			<span className="flex-1 ellipsis">{item.title}</span>
			  			<span className="flex-0 list-buttons">
			  				<Link to={`/sites/${item.id}/view`}>{"View"}</Link>
			  				<Link to={`/sites/${item.id}/edit`}>{"Edit"}</Link>
			  				<Link to={`/sites/${item.id}/view/delete`}>{"Delete"}</Link>
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

export default SitesList;