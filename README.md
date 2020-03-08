# for ssl on apache - add in the vhost setup
SSLStrictSNIVHostCheck off
<VirtualHost *:80>
    Redirect permanent / https://123.boxonline.com/
    ServerName 123.boxonline.com
</VirtualHost>

# in virtual host :443
SSLEngine on
SSLProxyEngine on
SSLCertificateFile	/projects/kinetizine.crt
SSLCertificateKeyFile /projects/kinetizine.key
SSLProxyVerify none 
SSLProxyCheckPeerCN off
SSLProxyCheckPeerName off
SSLProxyCheckPeerExpire off

RewriteEngine On
RewriteCond %{HTTP:Upgrade} =websocket [NC]
RewriteRule /(.*)           wss://localhost:4500/$1 [P,L]
RewriteCond %{HTTP:Upgrade} !=websocket [NC]
RewriteRule /(.*)           https://localhost:4500/$1 [P,L]

ProxyPassReverse / https://localhost:4500/

# end SSL


add in /etc/environment the line RAILS_ENV="staging" # or the actual environment
change /etc/login.defs and add to ENV_PATH /home/ubuntu/.rbenv/shims


-needed software
--rails 5
--mysql 5.7


*Note: the db schema does not load triggers so the migrations must be run

sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel

after 1st deploy
ln -s /data/123.ch/current/bin/start_app.sh /etc/init.d/123_app
rake secret and add the value to .bashrc var SECRET_KEY_BASE

add to ~/.bashrc

export ROOT_123CH="/data/123.ch/current"