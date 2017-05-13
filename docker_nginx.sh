
docker run --name nginx -d \
  -p 80:80 \
  -v /apps/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
  --restart always \
  nginx
