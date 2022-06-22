const express = require('express')
const flapApp = express()
const fs = require('fs')
const index = fs.readFileSync('./public/index.html',{encoding:'utf8'})

flapApp.use(express.static('public'));
flapApp.get('/',(req,res)=>{
    res.setHeader("Content-Type", "text/html")
    res.status(200).send(index)
})
flapApp.listen(4000, () => {
    console.log('Server running on port 4000...')
})