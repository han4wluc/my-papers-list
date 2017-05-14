
docker build --tag cron_1 ./cron/arxiv_scrape_1
docker run \
  --name cron_1 \
  --restart always \
  -v /apps:/apps \
  -d cron_1
