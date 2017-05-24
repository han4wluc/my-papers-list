
docker run --name nginx -d \
  -p 80:80 \
  -p 443:443 \
  -v /apps/mpl/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v /apps/mpl/certs:/certs \
  --restart always \
  nginx
