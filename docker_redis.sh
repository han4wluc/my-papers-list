docker run \
 --name redis \
 -v /apps/redis.conf:/usr/local/etc/redis/redis.conf \
 -v /data/redis:/data \
 -p 0.0.0.0:6379:6379 \
 --restart always \
 -d redis redis-server /usr/local/etc/redis/redis.conf

