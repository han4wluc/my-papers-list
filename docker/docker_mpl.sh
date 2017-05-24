
docker run \
   --name mpl \
   -v /apps/mpl:/apps/mpl \
   -w /apps/mpl \
   -p 8000:8000 \
   --restart on-failure:200 \
   -d node npm run dev:s
