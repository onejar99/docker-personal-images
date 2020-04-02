FROM php:5.5.29-apache

RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime
RUN echo 'Asia/Taipei' > /etc/timezone

RUN apt-get update
RUN apt-get install -y php5-dev
RUN docker-php-ext-install mbstring && docker-php-ext-enable mbstring
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install mysql && docker-php-ext-enable mysql
RUN apachectl restart

COPY src /var/www/html

EXPOSE 80
