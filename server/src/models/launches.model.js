//const getAllLaunches = require("../routes/launches/launches.controller");
const launchesDatabase=require('./launches.mongo')
const planets=require('./planets.mongo')
const axios=require('axios')
//const launches=new Map();

const DEFAULT_FLIGHT_NUMBER=100;

const launch={
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:'SpaceX Relite XzeA',
    launchDate:new Date('2030-12-11'), // 12 December 2030
    target:'Kepler-442 b',
    customers:['XaAe','ISRO'],
    upcoming:true,
    success:true

};


saveLaunch(launch)

const SPACEX_API_URL="https://api.spacexdata.com/v4/launches/query"

async function populateLaunches(){
     console.log('Launch Data fetchin...')
    const response=await axios.post(SPACEX_API_URL,{
        query:{},
        options:{
            pagination:false,
            populate:[
                {
                path:'rocket',
                select:{
                    name:1
                }
                },
                {
                    path:'payloads',
                    select:{
                        'customers':1
                    }
                }
            ]
            }
        }
    );
    if(response.status!==200){
        console.log("Problem downloading data")
        throw new Error("downlading launch data failed")
    }
    const launchDocs=response.data.docs;
    for(const launchDoc of launchDocs){
        const payloads=launchDoc.payloads; //its an array with one or many payload objects, each payload object has an array of 'customers' that is required
        customers=payloads.flatMap((payload)=>{
            return payload.customers;
        })

        const launch={
            flightNumber:launchDoc.flight_number,
            mission:launchDoc.name,
            rocket:launchDoc.rocket.name,
            launchDate:launchDoc.date_local, 
            target:'not applicable',
            customers,
            upcoming:launchDoc.upcoming,
            success:launchDoc.success
        }
       // console.log(`${launch.flightNumber}-->${launch.mission}`)
        await saveLaunch(launch)
    }
    
}
//for loading spaceX data
async function loadLaunchesData(){

   const firstLaunch= await findLaunch({
        flightNumber:1,
        rocket:'Falcon 1',
        mission:"FalconSat",

    })
    if(firstLaunch){
        console.log('launch data already exists!')
        return;
    }
    
        await populateLaunches()
    
   
}

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter)
}

async function getAllLaunches(){
   // return Array.from(launches.values({} ))
   return await launchesDatabase.find({},{"_id":0, "__v":0})
}
async function launchExists(id){
    //return launches.has(id)
    return await findLaunch({
        flightNumber:id
    })
}

//launches.set(launch.flightNumber,launch);



//since I keep forgetting-->upsert operation(insert+update)
async function saveLaunch(launch){

    //referential integrity check
    const planet =await planets.findOne({
        keplerName:launch.target
    })
    
    if(!planet && launch.target!=='not applicable'){
        throw new Error('Target planet not found!')
    }
    //only if target planet exists
    await launchesDatabase.findOneAndUpdate(
        {flightNumber:launch.flightNumber}, //S1: search if launch with same unique id exists, update if it does
        launch,                             //S2:if launch exist-->update changed values with this, else if does not , insert this as it is
        {
            upsert:true,                    //S3:boilerplate to make update an upsert
        }

    )
}



async function getLatestFlightNumber(){
    const latestLaunch=await launchesDatabase.findOne().sort('-flightNumber');

    if(!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
    else return latestLaunch.flightNumber;
}

/*upon getting a post request from client, we handle that post in our server with addNewLaunch(depreciated-->now scheduleNewLAunch)*/

// function addNewLaunch(launch){
//     latestFlightNumber++;
//     launches.set(latestFlightNumber,Object.assign(launch,{
//         success:true,
//         upcoming:true,
//         customer:['XaAe','ISRO','NASA'],
//         flightNumber:latestFlightNumber,
//     }))
// }
async function scheduleNewLaunch(launch){
    const newFlightNumber=await getLatestFlightNumber()+1
    const newLaunch=Object.assign(launch,{
        success:true,
        upcoming:true,
        customers:['XaAe','ISRO','NASA'],
        flightNumber: newFlightNumber,
    })
    await saveLaunch(launch)
}



async function abortLaunchById(launchId){
    //this time its a simple update and not a upsert
    const aborted= await launchesDatabase.updateOne({flightNumber:launchId},{
        //updating the launches with matching id with following to abort it inside our db 
        upcoming:false, 
        success:false
    })
    return aborted.acknowledged===true && aborted.matchedCount===1;
}



module.exports={
    getAllLaunches,
   // addNewLaunch,
    launchExists,
    abortLaunchById,
    scheduleNewLaunch,
    loadLaunchesData
}