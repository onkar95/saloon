const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
 dotenv.config();
 const cookieParser = require('cookie-parser')

 const port = process.env.PORT || 5000;

 const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cookieParser());

 app.get('/set-cookies', (req, res) => {
    res.cookie('isAuthenticated', true, { maxAge: 24 * 60 * 60 * 1000 });
    res.send('cookies are set');
  })
  app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    res.json(cookies);
  })

 app.use(cors(corsOptions))
app.use(express.json())

app.use('/auth', require('./routes/routes'))

mongoose.connect(process.env.mongoDB, {
    useNewUrlParser: true,
}).then(res => { console.log('db cnnected') }).catch(err => { console.log(err) })

app.listen(port,()=>console.log(`server is running on ${port}`))