import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';

import Markdown from 'remarkable';
import hljs from 'highlight.js';

class ApiHelper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
  }

  componentDidUpdate () {
    hljs.initHighlightingOnLoad()
    if (document.getElementById('code-block')) {
      hljs.highlightBlock(document.getElementById('code-block'))
    }
    hljs.initHighlighting.called = false
    hljs.initHighlighting()
  }

  render() {
  	let api_url;
  	switch (this.props.route) {
  		case 'page':
  			api_url = `pages/${this.props.params.id}`
  	}

    let code_snippet = `
      var settings = {
        'async': true,
        'crossDomain': true,
        'url': 'http://api.cms-api.dev/pages/17',
        'method': 'GET',
        'headers': {
          'authorization': 'T7edZnPgiy-EZUZf-vgg',
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        'processData': false
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    `;

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
                      }).render(code_snippet);

    return (
    	<span>
    		<button onClick={this.props.showHelp}>
    			{"Access"}
    		</button>
    		{this.props.showing ?
    			<div className="modal">
    				<div className="container">
    					<h3>{"Api help"}</h3>
    				</div>
    				<div className="container modal-content">
              <div id="code-block" dangerouslySetInnerHTML={{__html: codeContent}}/>
    				</div>
    				<div className="modal-footer container text-align-right">
    					<a href="" onClick={this.props.closeHelp}>
    						{"Close"}
    					</a>
              <button>{"Copy & close"}</button>
    				</div>
    			</div>
    			: null
    		}
  	  </span>
    );
  }
}

function closeHelp(e) {
	e.preventDefault();
	Store.get().set({
		help_showing: false
	})
}


function showHelp() {
	Store.get().set({
		help_showing: true
	})
}

export default warmUp(ApiHelper, [
	['showing', 'help_showing'],
	['showHelp', showHelp],
	['closeHelp', closeHelp]
]);