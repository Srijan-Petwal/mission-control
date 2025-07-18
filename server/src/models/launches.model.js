//const getAllLaunches = require("../routes/launches/launches.controller");

const launches=new Map();
let latestFlightNumber=100
const launch={
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:'SpaceX Relite XzeA',
    launchDate:new Date('2030-12-11'), // 12 December 2030
    target:'Kepler 442-b',
    customer:['XaAe','ISRO'],
    upcoming:true,
    success:true

};

function getAllLaunches(){
    return Array.from(launches.values( ))
}
function launchExists(id){
    return launches.has(id)
}

launches.set(launch.flightNumber,launch);

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,{
        success:true,
        upcoming:true,
        customer:['XaAe','ISRO','NASA'],
        flightNumber:latestFlightNumber,
    }))
}
function abortLaunchById(launchId){
    const aborted=launches.get(launchId)
    aborted.upcoming=false;
    aborted.success=false;
    return aborted;
}

module.exports={
    getAllLaunches,
    addNewLaunch,
    launchExists,
    abortLaunchById
}