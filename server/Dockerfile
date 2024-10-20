FROM ubuntu:latest
MAINTAINER Tycjan Fortuna <242213@edu.p.lodz.pl>

# Install apache, PHP, and supplimentary programs. openssh-server, curl, and lynx-cur are for debugging the container.
RUN apt-get update
RUN apt install software-properties-common apt-transport-https -y
RUN add-apt-repository ppa:ondrej/php -y
RUN apt-get update && apt-get -y upgrade && DEBIAN_FRONTEND=noninteractive apt-get -y install \
    apache2 \
    php8.3 \
    php8.3-pgsql \
    libapache2-mod-php8.3 \
    curl \
    php8.3-curl \
    nano \
    php8.3-xml \
    php8.3-dom \
    php8.3-zip \
    php8.3-bcmath \
    php8.3-tokenizer \
    php8.3-mbstring \
    php8.3-pdo \
    php8.3-gd \
    php8.3-cli \
    php8.3-redis \
    git \
    cron \
    #temp
    php8.3-xdebug \
    php8.3-sqlite3

# Enable apache mods.
RUN a2enmod php8.3
RUN a2enmod rewrite
RUN a2enmod ssl
RUN a2ensite default-ssl

# Update the PHP.ini file, enable <? ?> tags and quieten logging.
RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php/8.3/apache2/php.ini
RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php/8.3/apache2/php.ini

RUN echo "zend_extension=xdebug" >> /etc/php/8.3/apache2/php.ini
RUN echo "xdebug.mode=develop,debug" >> /etc/php/8.3/apache2/php.ini
RUN echo "xdebug.start_with_request = yes" >> /etc/php/8.3/apache2/php.ini
RUN echo "xdebug.client_host = \"host.docker.internal\"" >> /etc/php/8.3/apache2/php.ini
RUN echo "xdebug.client_ip = \"9003\"" >> /etc/php/8.3/apache2/php.ini
RUN echo "xdebug.idekey=\"VSCODE\"" >> /etc/php/8.3/apache2/php.ini
RUN echo "xdebug.log=/tmp/xdebug_remote.log" >> /etc/php/8.3/apache2/php.ini

# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

# Expose ports for apache server
EXPOSE 443
EXPOSE 80

# Update the default apache site with the config we created
ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

# From now on, we need to work in our website directory
WORKDIR /var/www/html

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# Add only composer files to run composer as a separate step from following ones
ADD composer.json /var/www/html/
# ADD composer.lock /var/www/html/
RUN composer install --no-scripts --no-autoloader --no-interaction

# Copy all project content (excluding exceptions defined in .dockerignore)
ADD . /var/www/html

# Autoloader and composer scripts
RUN composer dump-autoload --optimize

# This has to be the last step of all Laravel related commands, because they may cache some files and we need this cache to be writable by the web server
RUN chown -R www-data:www-data storage/
RUN chown -R www-data:www-data /var/www/html

# Run apache
CMD php artisan migrate && /usr/sbin/apache2ctl -D FOREGROUND
