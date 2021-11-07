const express = require('express')
const router = express.Router()
const fs = require('fs')

// change from app.get to router.get

// INDEX ROUTE
router.get('/', (req, res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)

    let typeFilter = req.query.typeFilter
    if (typeFilter) {
        creaturesData = creaturesData.filter((creatures)=> {
            return creatures.type.toLowerCase() === typeFilter.toLowerCase()
        })
    }

    res.render('prehistoric_creatures/index.ejs', {creaturesData: creaturesData})
})

// NEW ROUTE
router.get('/new', (req, res)=> {
    res.render('prehistoric_creatures/new.ejs')
})

// SHOW ROUTE
router.get('/:idx', (req, res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    let creaturesIndex = req.params.idx
    res.render('prehistoric_creatures/show.ejs', {displayedCreature: creaturesData[creaturesIndex]})
})

// POST ROUTE POST A NEW CREATURE
router.post('/', (req, res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)

    // add a new creature to creaturesData
    creaturesData.push(req.body)

    // save updated creaturesData to JSON
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    
    // redirect to GET /creatures (index)
    res.redirect('/prehistoric_creatures')
})

// DELETE A CREATURE
router.delete('/:idx', (req, res)=>{
    // get creatures array
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)

    // remove the deleted creatures from the creatures array
    creaturesData.splice(req.params.idx, 1)

    // save the new creatures to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

    res.redirect('/prehistoric_creatures')
})

module.exports = router 