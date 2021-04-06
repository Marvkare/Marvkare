const express = require('express')
const app = express()
const path = require('path')

app.use(express.urlencoded({extended: false}))
app.use(require('./routes/index.routes.js'))
app.use(express.static(path.join(__dirname, 'src/public')))


app.listen(3000, ()=>{
    console.log('Server on port 3000 :3')
})
console.log(path.join(__dirname, 'public'))