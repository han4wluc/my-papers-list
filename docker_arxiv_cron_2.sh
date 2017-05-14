
docker build --tag cron_2 ./cron/arxiv_scrape_2
docker run \
  --name cron_2 \
  --restart always \
  -v /apps:/apps \
  -d cron_2
  # ./cron.sh
  # -d cron && tail -f /var/log/cron.log
