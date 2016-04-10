import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import Block from 'components/Block';

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


			Store.trigger('BREADCRUMBS_SET', [
				{
					name: 'Sites',
					link: 'sites/view'
				},
				{
					name: body.title
				}
			])
			Store.trigger('PAGE_ACTIONS_SET', [
				{
					name: 'Delete',
					path: `sites/${body.id}/view/delete`
				},
				{
					name: 'Edit',
					path: `sites/${body.id}/edit`
				}
			])
		}, (err) => {
			Store.get().site.reset({});
			Store.get().set({site_loading: false})
		})
	}
	render() {
	  return (
	  	<Block loading={!this.props.site.id}>
		  	{this.props.children}
			</Block>
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