const {getAllLaunches,addNewLaunch,launchExists,abortLaunchById}=require('../../models/launches.model')
//const launchesRouter = require('./launches.router')

function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req,res){
   const launch=req.body
   if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
    return res.status(400).json({
        error:'Missing required fields in launch data inputted!'
    })
   }
   launch.launchDate=new Date(launch.launchDate);
   //if(launch.launchDate.toString()==='Invalid Date'){
   if(isNaN(launch.launchDate)){
    return res.status(400).json({
        error:'invalid launch date!'
    })
   }
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

function httpAbortLaunch(req,res){
    const launchId=Number(req.params.id);

    //if launch does not exist
    if(!launchExists(launchId))
    return res.status(404).json({
        error:"launch not found",
    })


    //launch exist
    const aborted=abortLaunchById(launchId)
    return res.status(200).json(aborted) 
}

module.exports={httpGetAllLaunches,httpAddNewLaunch,httpAbortLaunch};