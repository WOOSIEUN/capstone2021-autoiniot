const express = require('express')
const app = express();

app.use(express.static(__dirname + '/views'));

const server = app.listen(4000, () => {
    console.log('Start Server : localhost:4000');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res){
    res.render('index.html')
})

app.get('/main', function (req, res){
    res.render('main.html')
})