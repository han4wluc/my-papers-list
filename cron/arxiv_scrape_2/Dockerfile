FROM node:latest

# RUN apt-get update && apt-get -y install wget ca-certificates s3cmd cron rsyslog
RUN apt-get update && apt-get -y install cron rsyslog

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/crontab

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/crontab

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD cron && tail -f /var/log/cron.log
