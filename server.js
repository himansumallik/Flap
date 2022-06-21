const express = require('express')
const flapApp = express()
const fs = require('fs')



flapApp.listen(4000, () => {
    console.log('Server running on port 4000...')
})