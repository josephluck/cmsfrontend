import superagent from 'superagent';
import PersistentStorage from 'utils/PersistentStorage';
import {browserHistory} from 'react-router';

if (window.location.hostname !== 'localhost') {
  var API_ROOT = 'https://young-earth-94007.herokuapp.com/';
} else {
  var API_ROOT = 'http://cms-api.dev/';
}

// Handle errors (unauthorized, forbidden etc)

function handleErrors(status) {
  if (status === 403 || status === 401) {
    console.log('Should redirect to login screen')
    debugger
  }
}

// POST some data to the server

function post(params) {
  let token = PersistentStorage.get('token');

  return new Promise((resolve, reject) => {
    superagent
      .post(getApiUrl(params.url))
      .send(params.payload)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((error, res, a, b, c) => {
        error ?
          (function(res) {
            handleErrors(res.status);
            reject(res.body, res.status, res)
          })(res)
          :
          resolve(res.body, res.status, res);
      });
  });
}

// PUT some data to the server

function put(params) {
  let token = PersistentStorage.get('token');

  return new Promise((resolve, reject) => {
    superagent
      .put(getApiUrl(params.url))
      .withCredentials()
      .send(params.payload)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((error, res, a, b, c) => {
        error ?
          (function(res) {
            handleErrors(res.status);
            reject(res.body, res.status, res)
          })(res)
          :
          resolve(res.body, res.status, res);
      });
  });
}

// GET some data from the server

function get(params) {
  let token = PersistentStorage.get('token');

  return new Promise((resolve, reject) => {
    superagent
      .get(getApiUrl(params.url))
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((error, res, a, b, c) => {
        error ?
          (function(res) {
            handleErrors(res.status);
            reject(res.body, res.status, res)
          })(res)
          :
          resolve(res.body, res.status, res)
      });
  });
}

// DELETE some data from the server

function destroy(params) {
  let token = PersistentStorage.get('token');

  return new Promise((resolve, reject) => {
    superagent
      .delete(getApiUrl(params.url))
      .send(params.payload)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((error, res, a, b, c) => {
        error ?
          (function(res) {
            handleErrors(res.status);
            reject(res.body, res.status, res)
          })(res)
          :
          resolve(res.body, res.status, res);
      });
  });
}

// Tokens

function setToken(token) {
  PersistentStorage.set('token', token);
}

function removeToken() {
  PersistentStorage.remove('token');
}

// API urls

function getApiUrl(options) {
  switch (options.name) {
    case 'register':
      return API_ROOT + 'companies';
      break;
    case 'login':
      if (options.token) {
        return API_ROOT + `sessions/${options.token}`;
      }
      return API_ROOT + 'sessions';

      break;
    case 'company':
      return API_ROOT + `companies/${options.id}`;
      break;
    case 'templates':
      return API_ROOT + 'field_templates';
      break;
    case 'template':
      return API_ROOT + `field_templates/${options.template_id}`;
      break;
    case 'users':
      return API_ROOT + 'users';
      break;
    case 'user':
      return API_ROOT + `users/${options.id}`;
      break;
    case 'sites':
      return API_ROOT + 'sites';
      break;
    case 'site':
      return API_ROOT + `sites/${options.site_id}`;
      break;
    case 'pages':
      return API_ROOT + 'pages';
      break;
    case 'page':
      return API_ROOT + `pages/${options.page_id}`;
      break;
    case 'sections':
      return API_ROOT + 'sections';
      break;
    case 'section':
      return API_ROOT + `sections/${options.section_id}`;
      break;
    case 'items':
      return API_ROOT + 'items';
      break;
    case 'item':
      return API_ROOT + `items/${options.item_id}`;
      break;
    default:
      return false;
      break
  }
}


// Redirect (usually after POST, PUT, DELETE)
function redirect(path) {
  browserHistory.push(path);
}


export default {
  post,
  put,
  get,
  destroy,
  setToken,
  removeToken,
  redirect,
  API_ROOT
}