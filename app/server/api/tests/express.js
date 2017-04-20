
const express = require('express');
const bodyParser = require('body-parser');
import Rest from '../controller';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// const packageJson = require('../../package.json');
// app.use('/version', (req, res) => {
//   res.status(200).json({
//     name: packageJson.name,
//     version: packageJson.version
//   });
// });


// const mongoose = require('mongoose');

// var Schema = mongoose.Schema;
// var NoteSchema = new Schema({
//   title: String,
//   deleted: {
//     type: Boolean,
//     default: false,
//   }
// });
// var Note = mongoose.model('Note', NoteSchema);

// new Rest({
//   model: Note,
//   app,
//   routeName: '/note',
// });



export default async function(){

  return new Promise((resolve, reject)=>{
    const server = app.listen(PORT, () => {
      // console.log('app started')
      const host = server.address().address;
      const port = server.address().port;
      console.log(`express server listening at http://${host}:${port}`);
      resolve(app);
    });
  });
};

// module.exports = app;
