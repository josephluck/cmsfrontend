import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

class Site extends React.Component {
	constructor(props) {
		super(props);
		Store.get().set({
			site: {
				pages: []
			},
			site_loading: true
		});
	}

	componentWillMount() {
		Api.get({
			url: {
				name: 'site',
				site_id: this.props.params.site_id
			}
		}).then((body) => {
			Store.get().site.reset(body);
			Store.get().set({site_loading: false});
			this.addBreadcrumbsAndActions(body.title);
		}, (err) => {
			Store.get().site.reset({});
			Store.get().set({site_loading: false})
		})
	}
	componentWillUnmount() {
		this.removeBreadcrumbsAndActions();
	}
	addBreadcrumbsAndActions(title) {
		Store.trigger('BREADCRUMBS_ADD', {
			name: title
		})
		Store.trigger('BREADCRUMBS_REPLACE', {
			name: 'Sites',
			link: 'sites/view'
		})
		Store.trigger('PAGE_ACTIONS_SET', [
			{
				name: 'Delete',
				path: `sites/${this.props.site.id}/view/delete`
			},
			{
				name: 'Edit',
				path: `sites/${this.props.site.id}/edit`
			}
		])
	}
	removeBreadcrumbsAndActions() {
		Store.trigger('BREADCRUMBS_REMOVE', {
			name: this.props.site.title
		})
		Store.trigger('BREADCRUMBS_REPLACE', {
			name: 'Sites'
		})
	}

	render() {
	  return (
	  	<div>
		  	{this.props.children}
			</div>
	  );
	}
}

Site.defaultProps = {
	site: {},
	loading: true
}

export default warmUp(Site, [
	['site', 'site'],
	['loading', 'site_loading']
]);