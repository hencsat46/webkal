//import * as repository from "repository/repository.js"


const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())

app.post('/create', (req, res) => {
    //console.log(path.join(__dirname, 'img/arrow.png'))

    console.log(req.body)
    //res.sendFile(path.join(__dirname, 'img/arrow.png'))
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})