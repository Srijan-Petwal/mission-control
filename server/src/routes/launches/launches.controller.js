const {getAllLaunches,launchExists,abortLaunchById,scheduleNewLaunch}=require('../../models/launches.model')
//const launchesRouter = require('./launches.router')



async function httpGetAllLaunches(req,res){
    return res.status(200).json(await getAllLaunches())
}


async function httpAddNewLaunch(req,res){
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
   // addNewLaunch(launch);
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}

async function httpAbortLaunch(req,res){
    const launchId=Number(req.params.id);

    //if launch does not exist
    const requiredLaunch=await launchExists(launchId)
    if(!requiredLaunch )
    return res.status(404).json({
        error:"launch not found",
    })


    //launch exist
    const aborted= await abortLaunchById(launchId)
    if(!aborted) return res.status(400).json({
        err:"Launch not aborted",
    })
    else{
        return res.status(200).json({
            ok:true,
        })
        //return res.status(200).json(aborted)
    }
}

module.exports={httpGetAllLaunches,httpAddNewLaunch,httpAbortLaunch};