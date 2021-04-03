
console.log("Iniciando arquivo server.js");

//Iniciar o servidor express  
const express = require('express'); 
const app = express();  
//para remover: app.use(express.static('./'));
console.log("Express: OK");

//Importar o bodyParser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
console.log("BodyParser: OK.")

//Ativar o CORS
const cors = require('cors')
app.use(cors())
console.log("CORS: OK.")

// Define a View Engine como EJS
app.set('view engine', 'ejs');
console.log("EJS engine view: OK.")

// Definição das variáveis para criar a DOM para o JQuery funcionar com o EJS
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);
console.log("Pacote JQuery: OK");

//Definição da porta do servidor
//const http = require('http').Server(app);
const porta = process.env.PORT || 8926;
console.log("Servidor - Porta: " + porta)

//Criar a rota principal
app.get('/', (req, res) => {
  res.render('home');
});



// Carrega arquivos estáticos
app.use("/icons", express.static('./icons')); 
app.use("/style", express.static('./style')); 
app.use("/scripts", express.static('./scripts'));

app.listen(porta, () => console.log(`App ok sim na porta ${porta}!`))
console.log("Finalizando leitura de server.js");