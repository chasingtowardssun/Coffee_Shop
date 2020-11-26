# OSU_CS467_Capstone_Coffee_Shop
## Installation
```bash
cd admin && npm install
cd customer && npm install
```
## Run with local DB
Need to first setup `dbcon.js` correctly using the included `dbcon.local.js` file:
make necessary changes to the content in `dbcon.local.js` in both `admin` and `customer`
directory, then
```bash
cd admin && ln -sf dbcon.local.js dbcon.js
cd customer && ln -sf dbcon.local.js dbcon.js
```
### Run admin site
```bash
cd admin
npm start
```
### Run customer site
```bash
cd customer
npm start
```

## Run with DB connection to gcloud
Need to get gcloud access first, i.e. setup gcloud SDK locally and 
gain access to the gcloud apps (`coffee-shop-admin` and `coffee-shop-customer`).
### Run admin site
```bash
./run_admin.sh
```

### Run customer site
```bash
./run_customer.sh
```

### Run both sites
```bash
./run_both.sh
```
