// project-reactfornodeapi-09  BackEnd  (HMS UI)

const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const doctorsModel = require("./model/doctorsModel");
const navsModel =require("./model/navsModel")

const app = express() 
app.use(express.json())
app.use(cors())

mongoose
.connect("mongodb://127.0.0.1:27017/hmsdb")
.then(()=>{
    console.log("DB is connected...")
})

app.get("/",(req,res)=>{
    res.send("Connected to HMS App Api");
 })
 app.get("/navs",async(req,res)=>{
    const result =await navsModel.find({})
    res.send(result)
 })
 app.post("/addnav",(req,res)=>{
    const payload = req.body;
    const newNav = new navsModel(payload)
    newNav.save()
    res.send("Added Navigation")
 })
 app.post("/delnav",async(req,res)=>{
    const payload = req.body;
    await navsModel.findOneAndDelete(payload)
    res.send("Nav Delted")
 })

app.get("/docs",async(req,res)=>{
    const result =await  doctorsModel.find({})
    res.send(result)
})
app.post("/adddoctor", (req,res)=>{
    const payload = req.body;
    const newDoctor =  new doctorsModel(payload)
    newDoctor.save()
    res.send("Doctor Added...")
})
app.post("/deldoctor",async(req,res)=>{
    const payload = req.body;
    await doctorsModel.findOneAndDelete(payload)
    res.send("Doctor Record Deleted")
})
app.listen(1010,()=>{
    console.log("Server is running on 1010")
})

  

 