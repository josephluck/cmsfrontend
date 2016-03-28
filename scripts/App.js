import React, {Component} from 'react';
import { cool } from 'react-freezer-js';

import Store from 'store/Store';

function App({
	children
}) {
  return (
  	<div>
  		{children}
  	</div>
  );
}

export default cool(App, Store);
