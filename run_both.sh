function start_admin() {
  cd admin
  PORT=8080 npm start
}

function start_customer() {
  cd customer
  PORT=8081 npm start
}

./local_db_proxy.sh & start_admin & start_customer
