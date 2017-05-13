docker run \
       --name mpl \
       -v /apps:/apps \
       -w /apps \
       -p 8000:8000 \
       --restart on-failure:200 \
       node npm run dev:s