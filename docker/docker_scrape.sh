
docker run \
  --name scrape_1 \
  -v /apps/mpl:/apps/mpl \
  -w /apps/mpl \
  -d node node scrape_1_.js
