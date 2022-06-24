    const express = require('express')
    const app = express()
    const fs = require('fs')
    app.use(express.static('public'));

    app.listen(7000, () => {
        console.log('Server running on port 7000...')
    })