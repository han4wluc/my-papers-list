
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use('/static', express.static(path.join(__dirname, '../static')));

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

import routes from './routes';
routes(app);

require('./mongoose');
import Rest from '../api/controller';
import User from '../model/User';
import Paper from '../model/Paper';
// import PaperText from '../model/PaperText';
import Read from '../model/Read';

new Rest({
  model: User,
  app,
  routeName: '/user',
});

new Rest({
  model: Paper,
  app,
  routeName: '/paper',
});

new Rest({
  model: Read,
  app,
  routeName: '/read',
});

app.get('*', function(req, res){

  const html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div id="root"></div>
    </body>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    <script src="/static/bundle.js"></script>

</html>`;

  res.status(200).send(html);

});

// app.get('*', function(req, res){
//   res.status(200).send('hello');
// });

// app.get('*', function(req, res){
//   console.log('GET /');
//   res.status(200).send(
//     `
//     <!doctype html>
//     <html>
//       <head>
//         <title>Redux Universal Example</title>
//       </head>
//       <body>
//         hello hello ee
//         <div id="root"></div>
//         <script>
//           window.__INITIAL_STATE__ = ""
//         </script>
//         <script src="http://localhost:8080/app/server/static/bundle.js"></script>
//       </body>
//     </html>
//     `
//   );
// });

const server = app.listen(port, () => {
  console.log(`express server listening at http://localhost:${port}`);
});
