FROM php:5.5.29-apache

RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime
RUN echo 'Asia/Taipei' > /etc/timezone

RUN apt-get update && apt-get install -y vim php5-dev
RUN docker-php-ext-install mbstring && docker-php-ext-enable mbstring
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install mysql && docker-php-ext-enable mysql
COPY src/conf/php.ini /usr/local/etc/php/php.ini

# log rotation settings
RUN mkdir -p /var/log/custom
# RUN touch /var/log/custom/php_errors.log && chmod 0777 /var/log/custom/php_errors.log
COPY src/script/clearObsoleteErrorLog.sh /home/
COPY src/script/clearObsoleteAccessLog.sh /home/
RUN chmod +x /home/clearObsoleteErrorLog.sh /home/clearObsoleteAccessLog.sh
COPY src/conf/apache2-default.conf /etc/apache2/sites-available/custom-default.conf
RUN a2ensite custom-default
#RUN apachectl restart

# web files
COPY src/web /var/www/html

EXPOSE 80
