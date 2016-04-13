import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import { browserHistory } from 'react-router';

import Markdown from 'remarkable';
import hljs from 'highlight.js';
import {Link} from 'react-router';

class AccessHelper extends React.Component {
  constructor(props, state) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps() {
    this.generateCode();
  }

  generateCode() {
    console.log('Generating Code for ' + this.props.params.language)
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
    var codeContent = new Markdown('full', {
                        html: true,
                        xhtmlOut: false,
                        breaks: false,
                        langPrefix: 'language-',
                        linkify: true,
                        linkTarget: '',
                        typographer: false,
                        highlight: function (str, lang) {
                          if (lang && hljs.getLanguage(lang)) {
                            try {
                              return hljs.highlight(lang, str).value;
                            } catch (__) {}
                          }
                          try {
                            return hljs.highlightAuto(str).value;
                          } catch (__) {}
                          return '';
                        }
                      }).render(this.state.code_snippet);

    let base_root = this.props.location.pathname.split('/');
    base_root.pop()
    base_root = base_root.join('/');

    return (
			<div className="modal">
				<div className="container">
					<h3>{"Api help"}</h3>
				</div>
        <div className="tabs with-top-border">
          <Link to={`${base_root}/jquery`}
            className="tab"
            activeClassName="active">
            {"jquery"}
          </Link>
          <Link to={`${base_root}/node`}
            className="tab"
            activeClassName="active">
            {"node"}
          </Link>
          <Link to={`${base_root}/http`}
            className="tab"
            activeClassName="active">
            {"http"}
          </Link>
          <Link to={`${base_root}/air framework`}
            className="tab"
            activeClassName="active">
            {"air framework"}
          </Link>
        </div>
				<div className="container modal-content without-top-border">
          <div id="code-block" dangerouslySetInnerHTML={{__html: codeContent}} />
				</div>
				<div className="modal-footer container text-align-right">
					<a href=""
            onClick={() => {
              debugger
            }}>
						{"Close"}
					</a>
          <button
            onClick={() => {
              debugger
            }}>
            {"Copy & close"}
          </button>
				</div>
			</div>
    );
  }
}

export default warmUp(AccessHelper, [
  ['auth_token', 'company', 'auth_token']
]);