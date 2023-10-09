const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()


const facebookRoute = require('./src/route/facebook_route.js')




const app = express()
const port = process.env.PORT || 8081

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))



app.use('/', facebookRoute)






app.listen(port, () => {
    console.log(`App running on port ${port}`);
})