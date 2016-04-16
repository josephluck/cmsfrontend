import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as _ from 'underscore';

const page_transition_duration = 400;

export function PageTransition({
	routes,
  route,
	children
}) {
  var key_index = _.findIndex(routes, function(child_route) {
    return child_route.path === route.path
  }) + 1;
  var key = routes[key_index].path || 'root';

  return (
  	<ReactCSSTransitionGroup
  	  component="div"
  	  transitionName="animate-page"
  	  transitionEnterTimeout={page_transition_duration}
  	  transitionLeaveTimeout={page_transition_duration}>
  	  {React.cloneElement(children, {
  	    key: key
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
      transitionEnterTimeout={page_transition_duration}
      transitionLeaveTimeout={page_transition_duration}>
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
      transitionEnterTimeout={page_transition_duration}
      transitionLeaveTimeout={page_transition_duration}>
      {React.cloneElement(children, {
        key: transitionKey
      })}
    </ReactCSSTransitionGroup>
  );
}