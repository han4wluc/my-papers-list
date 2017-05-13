
docker build --tag cron ./cron
docker run \
  --name cron \
  --restart always \
  -v /apps:/apps \
  -d cron
