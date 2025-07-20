const mongoose=require('mongoose')

const planetsSchema=new mongoose.Schema({   
        keplerName:{
            type:String,
            required:true,
        }
}
)

//'Planet'--->"planets"-->model object linked to planet-schema
module.exports=mongoose.model('Planet',planetsSchema)