const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection')
const bodyParser = require('body-parser');
const job = require('./models/Job');
const Job = require('./models/Job');
const sequelize = require('sequelize');
const op = sequelize.Op;

const PORT = 3000;

app.listen(PORT, function(){
    console.log("O Express está rodando na porta " + PORT);
});

//body parser 
app.use(bodyParser.urlencoded({extended : false}));

//handle bars 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db.authenticate().then(() => {
    console.log("Conectou ao banco com sucesso");
}).catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
});

//routes
app.get("/", (req, res) => {
    
    let search = req.query.job;
    let query = '%'+ search + '%';

    if(!search){
        job.findAll({
            order: [['new_job', 'DESC']]
        })
        .then(jobs => {
            res.render('index', {jobs});        
        });
    } else { //Quando estiver buscar
        job.findAll({
            where: {title: {[op.iLike]:query}},
            order: [['new_job', 'DESC']]
        })
        .then(jobs => {
            res.render('index', {jobs, search});        
        });
    }
});

//Jobs routes
app.use('/jobs', require('./routes/jobs'));