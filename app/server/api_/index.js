
import axios from 'axios';

module.exports = function(app){
  app.post('/resetpassword', async function(req, res){
    try {
      const { token, password } = req.body;
      await axios.get(`https://us.leancloud.cn/1/resetPassword/${token}?password=${password}`);
      res.status(200).send({
        code: 0,
      });
    } catch (error){
      if(!error || !error.response || !error.resopnse.data || !error.response.data.error || error.response.data.error !== 'Token 已经过期。'){
        res.status(500).send();
        return;
      }
      res.status(200).send({
        code: 401,
        error: 'Invalid Token'
      });
    }
  });
};
