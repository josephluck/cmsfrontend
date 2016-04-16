import React from 'react';

import DeleteFormView from 'components/DeleteFormView';

class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let words = ["Slay", "Destroy", "Nuke", "Annihilate", "Smash", "Explode", "Sabotage", "Eliminate", "Blast", "Smite", "Pulverize"];
    this.state = {
      random_word: words[Math.floor(Math.random() * words.length)],
      error: "",
      confirmation_type: ""
    }
  }

  onConfirmationTextType(text) {
    this.state.confirmation_type = text;
  }

  onSubmit() {
    if (this.state.confirmation_type === this.state.random_word) {
      this.props.onSubmit();
    } else {
      this.setState({
        error: `Please enter ${this.state.random_word}`
      })
    }
  }

  render() {
    return (
      <DeleteFormView {...this.props}
        onConfirmationTextType={this.onConfirmationTextType.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        randomWord={this.state.random_word}
        error={this.state.error}>
        {this.props.children}
      </DeleteFormView>
    );
  }
}

export default DeleteForm;