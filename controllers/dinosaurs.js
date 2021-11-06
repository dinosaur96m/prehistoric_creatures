const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index.ejs', {dinoData: dinoData})
})

// NEW ROUTE
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})

// GET UPDATE FORM
router.get('/edit/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

// UPDATE A DINO
router.put('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // re-assign the name an type fields of the dino to be editted
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    // save the editted dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

// SHOW ROUTE
router.get('/:idx', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// POST A NEW DINO
router.post('/', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // add new dino to dinoData
    dinoData.push(req.body)

    // save updated dinoData to json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to GET /dinosaurs (index)
    res.redirect('/dinosaurs')
})

router.delete('/:idx', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)

    // save the new dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})

module.exports = router