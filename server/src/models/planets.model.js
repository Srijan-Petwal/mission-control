const fs=require('fs')
const {parse}=require('csv-parse')
const path=require('path')
const planets=require('./planets.mongo')


//const habitablePlanets=[]
const isPlanetHabitable=(planet)=>{
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
function loadPlanetsData(){
   return new Promise((resolve,reject)=>{

        fs.createReadStream(path.join(__dirname,'..','..','data','kepler-data.csv'))
        .pipe(parse({
            comment:'#',
            columns:true
        }))
        .on('data',async (planet)=>{
            if (isPlanetHabitable(planet)){
              //  habitablePlanets.push(planet);
                // await planets.create({
                //     keplerName:planet.kepker_name
                // })

                savePlanet(planet)
            }
        })
        .on('error',(err)=>{
            console.log('error in planetary search');
            reject(err)
        })
        .on('end',async ()=>{
            const countPlanets=(await getAllPlanets()).length
            console.log("planets search end...\nfound " + countPlanets + " habitable planets!");
            resolve()
            //console.log(habitablePlanets)
        });
    });


}

async function getAllPlanets(){
    return await planets.find({},{
        '_id':0 ,'__v':0
    })
}

async function savePlanet(planet){
    try{
            
        await planets.updateOne(
            
            {keplerName:planet.kepler_name},
            { $set: { keplerName: planet.keplerName }},
            {upsert:true}
     )
        }
        catch(err){
            console.error(`could not save a planet ${err}`)
        }
}

module.exports={
    loadPlanetsData,
    //planets:habitablePlanets,
    getAllPlanets,
}