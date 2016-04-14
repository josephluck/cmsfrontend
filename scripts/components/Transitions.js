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
      transitionEnterTimeout={400}
      transitionLeaveTimeout={400}>
      {React.cloneElement(children, {
        key: transitionKey
      })}
    </ReactCSSTransitionGroup>
  );
}

export function SlideTransition({
  transitionKey,
  children
}) {
  return (
    <ReactCSSTransitionGroup
      component="div"
      transitionName="slide-transition"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
      {React.cloneElement(children, {
        key: transitionKey
      })}
    </ReactCSSTransitionGroup>
  );
}