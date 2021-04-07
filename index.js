const express = require('express')
const app = express()
const path = require('path')
const exphbs  = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'views')))
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended: false}))
app.use(require('./routes/index.routes.js'))



app.listen(3000, ()=>{
    console.log('Server on port 3000 :3')
})

console.log(path.join(__dirname))