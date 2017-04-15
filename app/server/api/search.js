
import searchArxiv from '../utils/searchArxiv';

export default async function(req, res){


  const query = req.params.query;

  const result = await searchArxiv(query);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.status(200).json(result);

}
