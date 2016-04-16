import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import { browserHistory } from 'react-router';

import Markdown from 'remarkable';
import hljs from 'highlight.js';
import {Link} from 'react-router';
import {SlideTransition} from 'components/Transitions';

class AccessHelper extends React.Component {
  constructor(props, state) {
    super(props);
    this.props = props;
    this.state = {};
  }

  componentDidMount() {
    this.generateCode();
  }

  componentWillReceiveProps(props) {
    this.generateCode();
  }

  generateCode() {
    var api_url;

    if (window.location.href.includes('/pages/')) {
      api_url = `pages/${this.props.params.page_id}`
    } else {
      api_url = "";
    }

    if (this.props.params.language === 'jquery') {
      this.setState({
        code_snippet: `
          var settings = {
            'async': true,
            'crossDomain': true,
            'url': '${Api.API_ROOT + api_url}',
            'method': 'GET',
            'headers': {
              'authorization': '${this.props.auth_token}',
              'content-type': 'application/json',
              'cache-control': 'no-cache'
            },
            'processData': false
          }

          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        `
      });
    } else {
      this.setState({
        code_snippet: `language is: ${this.props.params.language}`
      });
    }
  }

  componentDidUpdate() {
    if (this.state.code_snippet) {
      hljs.initHighlightingOnLoad()
      if (document.getElementById('code-block')) {
        hljs.highlightBlock(document.getElementById('code-block'))
      }
      hljs.initHighlighting.called = false
      hljs.initHighlighting()
    }
  }

  render() {
    let base_route = this.props.location.pathname.split('/'),
        back_route = this.props.location.pathname.split('/');
    base_route.pop()
    back_route.pop();
    back_route.pop();
    base_route = base_route.join('/');
    back_route = back_route.join('/');

    return (
			<div className="modal">
				<div className="modal-header">
					<h3>{"Api help"}</h3>
				</div>
        <div className="tabs with-top-border">
          <Link to={`${base_route}/jquery`}
            className="tab"
            activeClassName="active">
            {"jquery"}
          </Link>
          <Link to={`${base_route}/node`}
            className="tab"
            activeClassName="active">
            {"node"}
          </Link>
          <Link to={`${base_route}/http`}
            className="tab"
            activeClassName="active">
            {"http"}
          </Link>
          <Link to={`${base_route}/air_framework`}
            className="tab"
            activeClassName="active">
            {"air framework"}
          </Link>
        </div>
				<div className="container modal-content without-top-border">
          <SlideTransition transitionKey={this.props.location.pathname}>
            {this.props.children}
          </SlideTransition>
				</div>
				<div className="modal-footer container text-align-right">
					<Link to={back_route}>
						{"Close"}
					</Link>
          <Link to={back_route}
            className="button"
            onClick={() => {
              debugger
            }}>
            {"Copy & close"}
          </Link>
				</div>
			</div>
    );
  }
}

export default warmUp(AccessHelper, [
  ['auth_token', 'company', 'auth_token']
]);