import React from 'react';
import { warmUp } from 'react-freezer-js';
import Api from 'utils/Api';

import Markdown from 'remarkable';

class AccessHelper extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    hljs.initHighlightingOnLoad();
    if (document.getElementById('code-block')) {
      hljs.highlightBlock(document.getElementById('code-block'));
    };
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  render() {
    var api_url;

    if (window.location.href.includes('/pages/')) {
      api_url = `pages/${this.props.params.page_id}`
    } else {
      api_url = "";
    }

    if (this.props.params.language === 'jquery') {
      var code_snippet = `
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
        `;
    } else {
      var code_snippet = `language is: ${this.props.params.language}`;
    }

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
      <div id="code-block" dangerouslySetInnerHTML={{__html: codeContent}} />
    );
  }
}

export default warmUp(AccessHelper, [
  ['auth_token', 'company', 'auth_token']
]);