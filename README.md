## TimeTracker - backend

**Technologies and tools:**

- node.js
- express.js

**Database:**

- mySQL

Setup:

```bash
CREATE DATABASE timetracker;

mysql -u username -p timetracker < db/timetracker_db.sql

```

### Setup:

```bash
mkdir backend
cd backend

npm init
npm install express
```

**Start:**

```bash
npm start
```

**Libraries:**

```bash
npm install --save-dev nodemon@3.0.2
npm install bcrpytjs@2.4.3
npm install dotenv@16.3.1
npm install express@4.18.2
npm install jsonwebtoken@9.0.2
npm install mysql2@3.6.5
npm install cors@2.8.5
```
