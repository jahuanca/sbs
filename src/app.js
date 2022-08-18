'use strict'

const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')
const cors=require('cors')
const fileSystem=require('file-system')
const app=express()
const config=require('./config')
const http = require('http').createServer(app);
const cron = require('node-cron');
 

app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });


  const whitelist = ['http://localhost:4200', 'http://localhost']
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
//configuracion lectura models
const models = path.join(__dirname, './models');
fileSystem.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

//midlewares
//app.use(cors({origin: 'http://localhost:4200'}))
app.use(cors({corsOptions}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))


const actualizacion_datos=require('./controllers/actualizacion_datos')

const fs = require('fs');
const basename = path.basename(__filename);

/*fs
  .readdirSync(path.join(__dirname,'routes'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    
    let f=file.replace('.js','');
    let name=f.replace(/_/g,'-');
    const dir = path.join(__dirname,'public','uploads',`${name}s`);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    app.use(`/${f}`, require(`./routes/${f}`)); 
  });
*/
app.use(express.static('./public'));
app.set('trust proxy', true);

http.listen(config.port,()=>{
  actualizacion_datos.llenarSBS();
  console.log(`API REST: corriendo en el puerto: ${config.port}`)
})


cron.schedule('0 */6 * * *', () => {
  actualizacion_datos.llenarSBS();
});

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}
