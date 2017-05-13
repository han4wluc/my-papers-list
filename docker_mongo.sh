docker run -d \
  --name mongo \
  -v /data/db:/data/db \
  -v /data/configdb:/data/configdb \
  -p 0.0.0.0:27017:27017 \
  --restart always \
  mongo --auth