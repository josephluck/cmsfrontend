import React from 'react';

import { Link } from 'react-router';
import NoResults from 'components/NoResults';
import Sortable from 'react-anything-sortable';
import SortableListItem from 'components/SortableListItem';

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
			  holdTime='0'
			  list={sites.toJS()}
			  template={SiteItem}
			  callback={onReorder}
			  listClass='list'
			  itemClass='flex list-item'
			  selectedKey='id'
			  disableReorder={false}/>
		</NoResults>
  );
}

function SiteItem(props) {
	let site = props.item;
	return (
		<div className="flex">
			<span className="flex-1 ellipsis">{site.title}</span>
			<span className="flex-0 list-buttons">
				<Link to={`/sites/${site.id}/view`}>{"View"}</Link>
				<Link to={`/sites/${site.id}/edit`}>{"Edit"}</Link>
				<Link to={`/sites/${site.id}/view/delete`}>{"Delete"}</Link>
			</span>
		</div>
	)
}

export default SitesList;