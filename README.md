# Mediconcen Demo

## Environment
---
- NodeJS 14.9
- Expo 4.4.3
- MariaDB 15.1

## Getting Started
---
### 1. Initialize Database
```bash
cd backend
mysql -u root < setupDB.sql
mysql -u root < sampleData.sql
```
This will initialize the database for the demo, and generate sample data. 

### 2. Start up backend server
```bash
npm install
npm start
```

### 3. Start up frontend
Open new terminal,
```bash
cd frontend
npm install
expo start
```

## Usage
After generating sample data, you can use following account to login to the system.
```
Email: admin@mediconcen.com
Password: password
```
or register a new account.