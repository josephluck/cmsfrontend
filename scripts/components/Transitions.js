import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as _ from 'underscore';

const page_transition_duration = 400;

function getKey({
  routes,
  route
}) {
  var key_index = _.findIndex(routes, function(child_route) {
    return child_route.path === route.path
  }) + 1;
  var key;
  if (routes[key_index]) {
    key = routes[key_index].path
  } else {
    key = 'root';
  }
  return key;
}

export function PageTransition({
	routes,
  route,
	children,
  transitionKey
}) {
  return (
  	<ReactCSSTransitionGroup
  	  component="div"
      className="flex flex-1"
  	  transitionName="animate-page"
  	  transitionEnterTimeout={page_transition_duration}
  	  transitionLeaveTimeout={page_transition_duration}>
  	  {React.cloneElement(children, {
  	    key: transitionKey || getKey({routes, route})
  	  })}
  	</ReactCSSTransitionGroup>
  );
}

export function ModalTransition({
  routes,
  route,
  children,
  transitionKey
}) {
  return (
    <ReactCSSTransitionGroup
      component="div"
      className="flex flex-1"
      transitionName="modal-transition"
      transitionEnterTimeout={page_transition_duration}
      transitionLeaveTimeout={page_transition_duration}>
      {React.cloneElement(children, {
        key: transitionKey || getKey({routes, route})
      })}
    </ReactCSSTransitionGroup>
  );
}

export function SlideTransition({
  routes,
  route,
  children,
  transitionKey
}) {
  return (
    <ReactCSSTransitionGroup
      component="div"
      transitionName="slide-transition"
      transitionEnterTimeout={page_transition_duration}
      transitionLeaveTimeout={page_transition_duration}>
      {React.cloneElement(children, {
        key: transitionKey || getKey({routes, route})
      })}
    </ReactCSSTransitionGroup>
  );
}