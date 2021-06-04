const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose')
const app = express()
const port = 3000

dotenv.config({path:'./config.env'})

require('./db/conn')

//Middleware
const middleware=(req,res,next)=>{
    console.log(`Hello my middleware`);
    next();
}


const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Navigation
app.get('/', (req, res)=> {
    res.send(`home`);
})

app.get('/register',middleware, (req, res)=> {
    res.send(`register`);
})

app.post('/register', urlencodedParser, [
    check('firstname', 'The firstname must be 3+ characters long')
        .exists()
        .isLength({ min: 3 }),

        check('email', 'Email is not valid')
            .isEmail()
            .normalizeEmail()
    
], (req, res)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        //const alert = errors.array()

        //res.render('register', {alert})
    }

})
app.get('/login',(req,res)=>{
    res.send(`Login`)
})
app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})