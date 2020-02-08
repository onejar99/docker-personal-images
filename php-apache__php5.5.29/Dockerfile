FROM php:5.5.29-apache

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install mysql && docker-php-ext-enable mysql
RUN apachectl restart


COPY src /var/www/html

EXPOSE 80
