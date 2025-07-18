const express=require('express')
const planetRouter=express.Router()
const planetController=require('./planets.controller')
planetRouter.get('/',planetController.httpGetAllPlanets)


module.exports=planetRouter
