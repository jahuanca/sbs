'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);

    if(modelName!='Auditoria' && modelName!='Ubicacion'){
      db[modelName].addHook('afterCreate', (value, options) => {
        db['Auditoria'].create({
          tabla: modelName,
          id_usuario: value.usuario,
          id_visita: value.visita_id,
          id_registro: value.id,
          accion: 'I',
          accion_usuario: value.accion_usuario,
          ip: value.ip,
          valor_anterior: null,
          valor_nuevo: JSON.stringify(value)
          
        })
      });

      db[modelName].addHook('beforeUpdate', (value, options) => {
        db['Auditoria'].create({
          tabla: modelName,
          id_usuario: value.dataValues.usuario,
          id_registro: value.dataValues.id,
          id_visita: value.dataValues.visita_id,
          accion: 'U',
          accion_usuario: value.dataValues.accion_usuario,
          ip: value.dataValues.ip,
          valor_anterior: JSON.stringify(value._previousDataValues),
          valor_nuevo: JSON.stringify(value.dataValues)
        })
        
      });


      /* db[modelName].addHook('afterBulkCreate', (value, options) => {
        value.forEach(v => {
          
          db['Auditoria'].create({
            tabla: modelName,
            id_usuario: v.usuario,
            id_registro: v.id,
            accion: 'I',
            accion_usuario: v.accion_usuario,
            ip: v.ip,
            valor_anterior: null,
            valor_nuevo: JSON.stringify(v)
          })
        });
      }); */




      /*db[modelName].addHook('afterFind', (value, options) => {
        let registro=(Array.isArray(value))?'Many':value.id;
        db['Auditoria'].create({
          tabla: modelName,
          id_usuario: '',
          id_registro: registro,
          accion: 'C',
          ip: '',
          valor_anterior: null,
          valor_nuevo: null
        })
      });*/

    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
