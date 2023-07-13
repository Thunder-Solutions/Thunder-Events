const express = require('express')
const path = require('path')
const app = express()
const port = 5002

const rootDir = path.resolve(__dirname, '..')

app.use(express.static(rootDir))

app.get('/', (req, res) => res.sendFile(rootDir + '/demo/demo.html'))
app.get('/getDemoEvent', (req, res) => res.sendFile(rootDir + '/demo/event.json'))

app.listen(port, () => console.log(`Thunder-Events demo listening on port ${port}!`))
