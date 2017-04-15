
import search from '../api/search';

export default function(app){

  app.get('/search/:query', search);

}
