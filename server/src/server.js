const http=require('http')
const mongoose=require('mongoose')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app=require('./app');


const {loadPlanetsData}=require('./models/planets.model')


const PORT=process.env.PORT || 8000;


const server=http.createServer(app)

mongoose.connection.once('open',()=>{
    console.log("connection ready");
})
mongoose.connection.on('error',(err)=>{
    console.error(err);
})
async function serverStart(){
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    await loadPlanetsData();

    server.listen(PORT,()=>{    
        console.log("Port is",PORT)
    })
}
serverStart()

