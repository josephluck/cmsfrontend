## Prerequisites

[![Greenkeeper badge](https://badges.greenkeeper.io/josephluck/cmsfrontend.svg)](https://greenkeeper.io/)

Ensure that the latest versions of node and npm are installed on your machine.

## Dependencies

Install all dependencies:

```bash
npm install
```

## Development server

To run the development server:

```bash
npm start
```

This runs a development mode server with live reload etc. The server defaults to port 5000.

Open `http://localhost:5000` in your browser.

## Production

This will build the JS and CSS for production. You'll need to do this before deploying to Heroku.

```bash
npm run build
```

## Deployement

Deployment is done through Heroku

```bash
git push heroku master
```