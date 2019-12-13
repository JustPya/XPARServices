const express = require('express');
const connectDB = require('./database/Connection');
const app = express();

/*Routes - Middleware*/
const bandRoute = require('./routes/band');
const authRoute = require('./routes/auth');
const songRoute = require('./routes/song');
const instrumentRoute = require('./routes/instrument');
const resourceRoute = require('./routes/resources');
const scenographyRoute = require('./routes/scenography');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/band', bandRoute);
app.use('/auth', authRoute);
app.use('/song', songRoute);
app.use('/inst', instrumentRoute);
app.use('/resource', resourceRoute);
app.use('/scen', scenographyRoute);


/*Routes */
app.get('/', (req, res) =>{
    res.send('Hello World');
});
const Port = process.env.Port || 3000;
connectDB();
app.listen(Port, () => console.log('Server Started'));

