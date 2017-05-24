
docker run -d \
  --name mongo \
  -v /apps/mongo/db:/data/db \
  -v /apps/mongo/configdb:/data/configdb \
  -p 0.0.0.0:27017:27017 \
  --restart always \
  mongo --auth
