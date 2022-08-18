'use strict'
const service=require('../services/index')
const models=require('../models')

async function isAuthAdmin(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,supervisor]=await get(models.Supervisor.findOne({
        where: {id_usuario: response[0]}
    }))

    let [err3,gestor]=await get(models.Gestor.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(err3) return res.status(500).json({message: `Error en el servidor ${err3}`})
    if(supervisor==null){
        if(gestor==null){
            return res.status(404).json({message: `Gestor nulos`})
        }else{
            req.gestor=gestor.id
            req.tipo=0;
        }
    }else{
        req.tipo=1;
        req.supervisor=supervisor.id
    }
    req.usuario=response[0]
    next()
}

async function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)
    req.usuario=response[0]
    next()
}

async function isAuthUser(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,gestor]=await get(models.Gestor.findOne({
        where: {id_usuario: response[0]}
    }))

    let [err3,supervisor]=await get(models.Supervisor.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(err3) return res.status(500).json({message: `Error en el servidor ${err3}`})
    if(supervisor==null){
        if(gestor==null){
            return res.status(404).json({message: `Gestor nulos`})
        }else{
            req.tipo=0;
            req.gestor=gestor.id
        }
    }else{
        req.tipo=1;
        req.supervisor=supervisor.id
    }
    req.usuario=response[0]
    next()
}

async function isAuthSuperAdmin(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }
    const token=req.headers.authorization.split(" ")[1]
    
    let [err, response]=await get(service.decodeToken(token))
    if(err) return res.status(401).json(`Error en con el token ${err}`)

    let [err2,gestor]=await get(models.Gestor.findOne({
        where: {id_usuario: response[0]}
    }))

    let [err3,supervisor]=await get(models.Supervisor.findOne({
        where: {id_usuario: response[0]}
    }))

    if(err2) return res.status(500).json({message: `Error en el servidor ${err2}`})
    if(err3) return res.status(500).json({message: `Error en el servidor ${err3}`})
    if(supervisor==null){
        if(gestor==null){
            return res.status(404).json({message: `Gestor nulos`})
        }else{
            req.gestor=gestor.id
            req.tipo=1;
        }
    }else{
        req.tipo=0;
        req.supervisor=supervisor.id
    }
    req.usuario=response[0]
    next()
}

module.exports={
    isAuthAdmin,
    isAuth,
    isAuthUser,
    isAuthSuperAdmin
}

function get(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
  }