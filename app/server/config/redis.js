

var redis = require("redis");
var client = redis.createClient({
  detect_buffers: true,
  host: '47.52.57.206',
  port: '6379',
  password: 'zzpEFz2xsH8FP1Q5TBnyZG9381md29gj3TYKNkoH4rsDvnyHCXCaUHt2SzRl2rZiZbsXA1STCfJ',
});

client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on('ready', function(){
  console.log('ready');

  client.set('key3', 'value3');
  client.get("key1", function(err, reply) {
      // reply is null when the key is missing
      console.log('key1', reply);
  });
})

// client.set("foo_rand000000000000", "OK");

// This will return a JavaScript String
// client.get("foo_rand000000000000", function (err, reply) {
//     console.log(reply.toString()); // Will print `OK`
// });



