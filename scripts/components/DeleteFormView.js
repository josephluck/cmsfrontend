import React from 'react';

import { Link } from 'react-router';
import FormInput from 'components/FormInput';

function DeleteFormView({
	onSubmit,
	loading,
  title,
  children,
  cancelLinkPath,
  onConfirmationTextType,
  error,
  randomWord
}) {
  return (
    <form className="modal"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
      <div className="modal-header">
        <h3>{title}</h3>
      </div>
      <div className="container modal-content">
        <div>
          {children}
          {"Please enter "}
          <strong>
            {`${randomWord}`}
          </strong>
          {" into the box below and click Delete"}
        </div>
        <div className="container">
          <FormInput error={error}>
            <input name="title"
              type="text"
              onChange={(e) => {
                onConfirmationTextType(e.target.value);
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

DeleteFormView.defaultProps = {

}

export default DeleteFormView;