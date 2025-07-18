const fs=require('fs')
const {parse}=require('csv-parse')
const path=require('path')

const habitablePlanets=[]
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
        .on('data',(planet)=>{
            if (isPlanetHabitable(planet)){
                habitablePlanets.push(planet);
            }
        })
        .on('error',(err)=>{
            console.log('error in planetary search');
            reject(err)
        })
        .on('end',()=>{
            console.log("planets search end...");
            resolve()
            //console.log(habitablePlanets)
        });
    });


}

function getAllPlanets(){
    return habitablePlanets
}

module.exports={
    loadPlanetsData,
    //planets:habitablePlanets,
    getAllPlanets,
}