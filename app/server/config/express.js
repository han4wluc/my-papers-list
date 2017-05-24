
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';




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

require('./mongoose');
require('../api')(app);
require('../api/rest')(app);

import routes from './routes';
routes(app);

const html = fs.readFileSync(path.join(__dirname, '../../../index.html'), 'utf-8')
  .replace('<script src="./app/server/static/bundle.js"></script>', '<script src="/static/bundle.js"></script>');






import { renderToString } from 'react-dom/server';
import App from '../../client/app';

app.get('*', function(req, res){

  const h = renderToString(
    <App/>
  );

  console.log(h);

  // res.status(200).send(html);


  // const html = renderToString(
  //   <Provider store={store}>
  //     <SongDetailContainer />
  //   </Provider>
  // )

});

const server = app.listen(port, () => {
  console.log(`express server listening at http://localhost:${port}`);
});
