import React from 'react';
import FormHelper from 'utils/FormHelper';

import { Link } from 'react-router';
import FormInput from 'components/FormInput';

let words = ["Slay", "Destroy", "Nuke", "Annihilate", "Smash", "Explode", "Sabotage", "Eliminate", "Blast", "Smite", "Pulverize"];
let random_word = words[Math.floor(Math.random() * words.length)];
let error = "";
let confirmation_type = ""

function DeleteForm({
	onSubmit,
	loading,
  title,
  children,
  cancelLinkPath
}) {
  return (
    <form className="modal"
      onSubmit={(e) => {
        e.preventDefault();
        debugger
        if (confirmation_type === random_word) {
          onSubmit();
        } else {
          error = `Please enter ${random_word}`;
        }
      }}>
      <div className="container">
        <h3>{title}</h3>
      </div>
      <div className="container modal-content">
        <div>
          {children}
          <strong>
            {`${random_word}`}
          </strong>
          {" into the box below and click Delete"}
        </div>
        <div className="container">
          <FormInput error={error}>
            <input name="title"
              type="text"
              onChange={(e) => {
                confirmation_type = e.target.value;
              }} />
          </FormInput>
        </div>
      </div>
      <div className="modal-footer container text-align-right">
        <Link to={cancelLinkPath}>
          {"Cancel"}
        </Link>
        <button type="submit">
          {loading ?
            "Deleting"
            : "Delete"
          }
        </button>
      </div>
    </form>
  );
}

DeleteForm.defaultProps = {

}

export default DeleteForm;