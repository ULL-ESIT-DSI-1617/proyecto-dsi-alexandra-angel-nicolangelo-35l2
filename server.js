var express = require('express');
var  app = express();
var Sqlite3 = require('sqlite3').verbose(),
    bodyParser = require('body-parser'),
    db = new Sqlite3.Database('temperaturas.sqlite');
/* We add configure directive to tell express to use Pug to
   render templates */
app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
// See http://expressjs.com/en/api.html#app.engine

// Allows express to get data from POST requests
app.use(bodyParser.urlencoded({
    extended: true
}));

// Database initialization
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='temperaturas'", function(err, row) {
    if(err !== null) {
        console.log(err);
    }
    else if(row == null) {
        db.run('CREATE TABLE "temperaturas" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "inicial" VARCHAR(255), "final" VARCHAR(255), "name" VARCHAR(255))', function(err) {
            if(err !== null) {
                console.log(err);
            }
            else {
                console.log("Tabla 'temperaturas' inicializada.");
            }
        });
    }
    else {
        console.log("Tabla 'temperaturas' ya esta inicializada.");
    }
});

db.on('trace', (m)=> console.log(`Consulta actual: ${m}`));

// We render the templates with the data
app.get('/', function(req, res) {
    db.all("SELECT * FROM temperaturas ORDER BY inicial ", function(err, rows) {
        if(err !== null) {
            res.status(500).send("Un error ha ocurrido con la base de datos -- " + err);
        }
        else {
            res.render('index.ejs', {temperaturas: rows}, function(err, html) {
                res.status(200).send(html);
               
                
            });
        }
    });
});


// We define a new route that will handle bookmark creation
app.post('/add', function(req, res) {
    nombre = req.body.onlyname;
    inicial = req.body.inicial;
    final = req.body.estasi;
    sqlRequest = "INSERT INTO 'temperaturas' (inicial, final, name) VALUES('" + inicial + "', '" + final + "', '" + nombre + "')"
    db.run(sqlRequest, function(err) {
        if(err !== null) {
            res.status(500).send("Un error ha ocurrido -- " + err);
        }
        else {
            res.redirect('back');
        }
    });
});

// We define another route that will handle bookmark deletion
app.get('/delete/:id', function(req, res) {
    db.run("DELETE FROM temperaturas WHERE id='" + req.params.id + "'", function(err) {
        if(err !== null) {
            res.status(500).send("An error has occurred -- " + err);
        }
        else {
            res.redirect('back');
        }
    });
});

//Cerrar sesion
/*app.get('/logout', function(req,res){
  req.session.destroy();
  res.send("logout success!");

});*/

/* This will allow to run your app smoothly but
 it won't break other execution environment */
var port = process.env.PORT || 8080;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
app.listen(port, function() {
    console.log("Servidor eeescuchando en %s:%d ",
                host, port, app.get('env'));
});
