import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

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

// Sites
import Sites from 'containers/Sites';
import NewSite from 'containers/NewSite';
import Site from 'containers/Site';
import ViewSite from 'containers/ViewSite';
import EditSite from 'containers/EditSite';
import DeleteSite from 'containers/DeleteSite';

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

// Misc
import AccessHelper from 'components/AccessHelper';
import AccessLanguage from 'components/AccessLanguage';

render((
<Router history={browserHistory}>
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
        <Route path="new" component={NewUser} />
        <Route path="view" component={Users}>
          <Route path=":id" component={User}>
            <Route path="delete" component={DeleteUser} />
          </Route>
        </Route>
        <Route path=":id" component={User}>
          <Route path="edit" component={EditUser} />
        </Route>
      </Route>

      <Route path="sites">
        <Route path="view" component={Sites} />
        <Route path="new" component={NewSite} />
        <Route path=":site_id" component={Site}>
          <Route path="view" component={ViewSite}>
            <Route path="delete" component={DeleteSite} />
          </Route>
          <Route path="edit" component={EditSite} />
          <Route path="pages">
            <Route path="new" component={NewPage} />
            <Route path=":page_id" component={Page}>
              <Route path="view" component={ViewPage}>
                <Route path="delete" component={DeletePage} />
                <Route path="access" component={AccessHelper}>
                  <Route path=":language" component={AccessLanguage} />
                </Route>
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
  	</Route>
  </Route>
</Router>
), document.getElementById('root'))