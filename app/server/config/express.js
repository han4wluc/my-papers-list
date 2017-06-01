
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import React from 'react';
import _ from 'lodash';

import routes from './routes';
import { renderToString } from 'react-router-server';
import App from '../../client/app';
import { Provider } from 'react-redux';
// import { ServerStateProvider } from 'react-router-server';
import { Switch, Route, StaticRouter } from 'react-router';

import initStore from '../../client/store';

const app = express();
const port = 8000;

app.use('/static', express.static(path.join(__dirname, '../static')));
app.use('/DE01F7C8826788A6CD118D53CA51F6EE.txt', express.static(path.join(__dirname, '../DE01F7C8826788A6CD118D53CA51F6EE.txt')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// dev only
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const mongoose = require('./mongoose');
require('../api')(app);
require('../api/rest')(app);

routes(app);


// import { renderToString } from 'react-dom/server';

// const initialEmptyState = _.cloneDeep(initStore.getState());

// const replaceJs = process.env.NODE_ENV === 'production' ?
//   `<script src="http://localhost:8080/app/server/static/bundle.js"></script>` :
//   '<script src="/static/bundle.js"></script>';

const serverRender = async function(req, res){
  const html_ = fs.readFileSync(path.join(__dirname, '../../../index.html'), 'utf-8')
    .replace('<script src="./app/server/static/bundle.js"></script>', '<script src="/static/bundle.js"></script>');
  const context = {};
  const store = initStore();
  const { html } = await renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );
  if(context.url){
    console.log('redirect');
    res.redirect(301, context.url);
    return;
  }
  const initialState = store.getState();
  const initialStateString = `<script>window.__INITIAL_STATE__=${JSON.stringify(initialState)}</script>`;
  const newHtml = html_.replace(`<!--HOOK-->`, html).replace(`<!--HOOK_INITIAL_STATE-->`, initialStateString);
  res.status(200).send(newHtml);
};

['/', '/signup', '/login', '/read', '/detail', '/reqpass', '/reset', '/profile'].forEach((routeName)=>{
  app.get(routeName, serverRender);
});

const server = app.listen(port, () => {
  console.log(`express server listening at http://localhost:${port}`);
});

export {
  mongoose,
};

