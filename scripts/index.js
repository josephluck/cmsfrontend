import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

// App/Login
import App from './App';
import Register from 'containers/Register';
import Login from 'containers/Login';
import RequireLogin from 'containers/RequireLogin';

// Settings
import Settings from 'containers/Settings';
import ViewSettings from 'containers/ViewSettings';
import DeleteCompany from 'containers/DeleteCompany';

// Users
import Users from 'containers/Users';
import NewUser from 'containers/NewUser';
import User from 'containers/User';
import EditUser from 'containers/EditUser';
import DeleteUser from 'containers/DeleteUser';

// Pages
import Pages from 'containers/Pages';

// Page
import NewPage from 'containers/NewPage';
import Page from 'containers/Page';
import ViewPage from 'containers/ViewPage';
import EditPage from 'containers/EditPage';
import DeletePage from 'containers/DeletePage';

// Sections
import NewSection from 'containers/NewSection';
import Section from 'containers/Section';
import ViewSection from 'containers/ViewSection';
import EditSection from 'containers/EditSection';
import DeleteSection from 'containers/DeleteSection';

// Items
import NewItem from 'containers/NewItem';
import Item from 'containers/Item';
import EditItem from 'containers/EditItem';
import DeleteItem from 'containers/DeleteItem';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Register} />
    	<Route path="login" component={Login}></Route>
    	<Route component={RequireLogin}>
        <Route path="settings" component={Settings}>
          <Route path="view" component={ViewSettings}>
            <Route path="delete" component={DeleteCompany} />
          </Route>
        </Route>
        <Route path="users">
          <Route path="view" component={Users}>
            <Route path=":id" component={User}>
              <Route path="delete" component={DeleteUser} />
            </Route>
          </Route>
          <Route path=":id" component={User}>
            <Route path="edit" component={EditUser} />
          </Route>
          <Route path="new" component={NewUser} />
        </Route>
    		<Route path="pages">
    			<Route path="view" component={Pages} />
    			<Route path="new" component={NewPage} />
          <Route path=":id" component={Page}>
            <Route path="view" component={ViewPage}>
              <Route path="delete" component={DeletePage} />
            </Route>
            <Route path="edit" component={EditPage} />
            <Route path="new_section" component={NewSection} />
            <Route path="sections">
              <Route path=":section_id" component={Section}>
                <Route path="view" component={ViewSection}>
                  <Route path="delete" component={DeleteSection} />
                  <Route path="items">
                    <Route path=":item_id" component={Item}>
                      <Route path="delete" component={DeleteItem} />
                    </Route>
                  </Route>
                </Route>
                <Route path="edit" component={EditSection} />
                <Route path="new_item" component={NewItem} />
                <Route path="items">
                  <Route path=":item_id" component={Item}>
                    <Route path="edit" component={EditItem} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
    		</Route>
    	</Route>
    </Route>
  </Router>
), document.getElementById('root'))