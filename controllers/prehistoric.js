const express = require('express')
const router = express.Router()
const fs = require('fs')
// const { stringify } = require('querystring')

//IDEX ROUTE
router.get('/', (req, res)=>{
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)

    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        oldDinoData = oldDinoData.filter((dino)=>{
            return dino.type.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('prehistoric/pIndex.ejs', {oldDinoData: oldDinoData})
})

//NEW ROUTE
router.get('/new', (req, res)=>{
    res.render('prehistoric/oldNew.ejs')
})

//GET UPDATE FORM
router.get('/edit/:idx', (req, res)=>{
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)

    res.render('prehistoric/oldEdit.ejs', {oldDinoId: req.params.idx, oldDino: oldDinoData[req.params.idx]})
})

//UPDATE A DINO
router.put('/:idx', (req, res)=>{
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)

    //re-assign the type and img_url fields of the oldDino to be edited
    oldDinoData[req.params.idx].type = req.body.type
    oldDinoData[req.params.idx].img_url = req.body.img_url

    //save the edited dinosaurs to the json file
    fs.writeFileSync('./prehistoric.json', JSON.stringify(oldDinoData))
    res.redirect('/prehistoric_creatures')
})

//SHOW ROUTE
router.get('/:idx', (req, res)=>{
    //get oldDinos array
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)

    //get array index from url parameter
    let oldDinoIndex = req.params.idx

    res.render('prehistoric/oldShow.ejs', {displayedDino: oldDinoData[oldDinoIndex]})
})

//POST A NEW OLD DINO
router.post('/', (req, res)=>{
    //get oldDinos array
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)

    //add a new old dino to oldDinoData
    oldDinoData.push(req.body)

    //save updated oldDinoData to json
    fs.writeFileSync('./prehistoric.json', JSON.stringify(oldDinoData))

    //redirect to GET /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

router.delete('/:idx', (req, res)=>{
    //get oldDinosArray
    let oldDinos = fs.readFileSync('./prehistoric.json')
    let oldDinoData = JSON.parse(oldDinos)

    //remove the deleted dinosaur from the oldDinos array
    oldDinoData.splice(req.params.idx,1)
        
        //save the new old dions to the json file
        fs.writeFileSync('./prehistoric.json', JSON.stringify(oldDinoData))

        res.redirect('/prehistoric_creatures')
})

module.exports = router