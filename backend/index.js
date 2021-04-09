const express = require('express');
const app = express();

//Import Routes
const authRoute = require('./routes/auth');
const acctMRoute = require('./routes/acctManagement')
const consultationRoute = require('./routes/consultation')

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/user', acctMRoute);
app.use('/api/consultation', consultationRoute);


app.listen(3000, () => console.log('Server up and running'));