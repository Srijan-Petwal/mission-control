
const express=require('express')
const path=require('path')

const planetRouter=require('./routes/planets/planets.router')
const launchesRouter=require('./routes/launches/launches.router')
const cors=require('cors')
const app=express()

app.use(cors({
    origin:'http://localhost:3000'
}));
app.use(express.json())
app.use(express.static(path.join(__dirname,'..','public')))
app.use('/planets',planetRouter)
app.use('/launches',launchesRouter)
// app.get('/*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'..','public','index.html'))
// })
app.use((req, res, next) => {
    if(req.method==='GET')
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports=app;