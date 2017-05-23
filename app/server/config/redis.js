
const redis = Promise.promisifyAll(require('redis'));

var client = redis.createClient({
  detect_buffers: true,
  host: '47.52.57.206',
  port: '6379',
  password: 'zzpEFz2xsH8FP1Q5TBnyZG9381md29gj3TYKNkoH4rsDvnyHCXCaUHt2SzRl2rZiZbsXA1STCfJ',
});

client.on('error', console.log);

client.on('ready', function(){
  console.log('ready');
});

export default redis;
