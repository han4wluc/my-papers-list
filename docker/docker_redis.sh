
docker run \
  --name redis \
  -v /apps/mpl/redis.conf:/usr/local/etc/redis/redis.conf \
  -v /apps/redis:/data \
  -p 0.0.0.0:6379:6379 \
  --restart always \
  -d redis redis-server /usr/local/etc/redis/redis.conf
