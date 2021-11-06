const { Router } = require('express')
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

//middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body-parser middleware
app.use(express.urlencoded({extended: false}))
//method over ride (for what? something about the POST function being used for deleting)
app.use(methodOverride('_method'))

//controller middleware
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric.js'))

app.get('/', (req, res)=> {
    res.render('home.ejs')
    
})



// show all old dinos
app.get('/prehistoric_creatures', (req, res)=>{
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)
    console.log(oldDinoData)
    res.render('pIndex.ejs', {oldDinoData: oldDinoData})
})


//NEW oldDino Route
app.get('/prehistoric_creatures/new', (req, res)=>{
    res.render('oldNew.ejs')
})

//post a new OLD Dino
app.post('/prehistoric_creatures', (req, res)=>{
    //get dinosaurs
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)
    
    //add new dino to dinoData
    oldDinoData.push(req.body)

    //save updated dinoData to JSON
    fs.writeFileSync('./prehistoric.json', JSON.stringify(oldDinoData))

    //redirect to GET /dinosaurs (i.e. index page)
    res.redirect('/prehistoric_creatures')
})

//show one oldDino by idx
app.get('/prehistoric_creatures/:idx', (req, res)=>{
    //get dinosaurs
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)

    //get array index form url parameter
    let oldDinoIndex = req.params.idx
    console.log(oldDinoData[oldDinoIndex])

    res.render('oldShow.ejs', {displayedDino: oldDinoData[oldDinoIndex] })
})
    
app.listen(8000, ()=>{
    console.log('8k sound is here')
})