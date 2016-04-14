import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export function PageTransition({
	transitionKey,
	children
}) {
  return (
  	<ReactCSSTransitionGroup
  	  component="div"
  	  transitionName="animate-page"
  	  transitionEnterTimeout={400}
  	  transitionLeaveTimeout={400}>
  	  {React.cloneElement(children, {
  	    key: transitionKey
  	  })}
  	</ReactCSSTransitionGroup>
  );
}


export function ModalTransition({
  transitionKey,
  children
}) {
  return (
    <ReactCSSTransitionGroup
      component="div"
      transitionName="modal-transition"
      transitionEnterTimeout={4000}
      transitionLeaveTimeout={4000}>
      {React.cloneElement(children, {
        key: transitionKey
      })}
    </ReactCSSTransitionGroup>
  );
}