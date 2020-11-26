cd /tmp
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
chmod +x cloud_sql_proxy
./cloud_sql_proxy -dir . -instances=coffee-shop-admin:us-west2:coffee-shop-db=tcp:3306