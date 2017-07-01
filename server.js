var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var bodyParser = require('body-parser');
var Sqlite3 = require('sqlite3').verbose(),
    bodyParser = require('body-parser'),
    db = new Sqlite3.Database('temperaturas.sqlite');

//archivo donde se guardan los usuarios//
var file = './users.json';

//Configuramos el directorio de vistas
app.set('views', './views');
app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : false})); //Para recuperar parámetros de peticiones post

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

//Funcion de autenticación, si existe nombre y password en la sesión, se puede ver el contenido
var auth = function(req, res, next) {

      if(req.session && req.session.username && req.session.password){
        return next();
      }
      else{
      return res.sendStatus(401);
      }
  };

//Ruta estática para ver el contenido, se necesita haber iniciado previamente sesion
app.use(express.static(__dirname+'/assets/'));
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
//MENU//
/*var instrucciones = `
<h1>Visita los siguientes enlaces para ver el contenido, loguearte, cerrar sesión o registrarte: </h1>
<ul>
  <li> <a href="/content">Contenido</a> </li>
  <li> <a href="/login">Iniciar sesión</a> </li>
  <li> <a href="/logout">Cerrar sesión</a> </li>
  <li> <a href="/register">Registrarse</a> </li>
</ul>
`;*/

//Nos redirige al fichero menu.ejs
app.get('/', function(req,res){
	res.render('menu');
  //res.send(instrucciones);
});


//Fase de login //
//Nos redirige al html para introducir los datos
app.get('/login', function (req, res) {
  if ( (!req.session.username)) {
    res.render('login'); //Redirigir al fichero login.ejs
  }
  else if ((req.session.username)) {
    res.render('logincompleto', {username:req.session.username}); //redirigir el fichero logincompleto.ejs
	//return res.render('index');
  	
  }
});

//Cogemos los datos del formulario y los envia al servidor, 
//comprobamos que el usuario existe y la contraseña coincide
app.post('/login', function(req,res){


  var configFile = fs.readFileSync(file);
  var config = JSON.parse(configFile);

  for(var i=0; i<config.length; i++){
    if(req.session && (req.body.username == config[i].username )&& (bcrypt.compareSync(req.body.password, config[i].password))){
      req.session.username = req.body.username;
      req.session.password = req.body.password;
      req.session.admin = true;
      return res.render('logincompleto', {username:req.session.username});
    } //Ponemos return para evitar tratar de enviar dos veces, por lo que se sale de la función cuando sea necesario
  }
   return res.render('errorlogin');

})

//Fase de registro //
app.get('/register', function (req, res) {
  if ((!req.session.username)) {
    res.render('formularioregistro');
  }
  else{
    res.render('logincompleto', {username:req.session.username});
  }
});

//Se registran los usuarios nuevos en el fichero users.json
app.post('/register', function (req, res) {
    var configFile = fs.readFileSync(file);
    var config = JSON.parse(configFile);
    config.push({"username" : req.body.username, "password" : bcrypt.hashSync(req.body.password, salt) });
    var configJSON = JSON.stringify(config);
    fs.writeFileSync(file, configJSON);
    res.render('registrado', {username:req.body.username}); //Redirige al fichero registrado.ejs

});

//Conversor//
app.get('/index', function(req,res){
//enseñamos solo los valores en la bdd del usuario actual
  db.all("SELECT * FROM temperaturas WHERE name='" + req.session.username + "' ORDER BY inicial ", function(err, rows) {
        if(err !== null) {
            res.status(500).send("Un error ha ocurrido con la base de datos -- " + err);
        }
        else {
            var size = Object.keys(rows).length;
            //el usuario aún no ha hecho niguna consulta por lo que la bdd para ese usuario está vacia
            if (size ==0){
                var element = {};
                element.name = req.session.username;
                element.id = 0;
                element.inicial = "consulta";
                element.final = "inicial para";
                rows.push(element);
            }
            res.render('index.ejs', {temperaturas: rows},function(err, html) {
                res.status(200).send(html);
            });
        }
    });

});

// We define a new route that will handle bookmark creation
app.post('/add', function(req, res) {
    inicial = req.body.inicial;
    final = req.body.estesi;
    nombre = req.session.username;
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

//Cerrar sesion //
app.get('/logout', function(req,res){
  req.session.destroy();
  res.render('logout');
});



var port = process.env.PORT || 8080;
app.listen(port);
console.log("Server de sessions y autenticación escuchando por el puerto " + port);
