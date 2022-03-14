const express = require('express')
const app = express()
const port = 5001

app.use(express.static(__dirname))

app.get('/', (req, res) => res.sendFile(__dirname + '/demo/demo.html'))
app.get('/getDemoEvent', (req, res) => res.sendFile(__dirname + '/demoEvent.json'))

app.listen(port, () => console.log(`Thunder-Events demo listening on port ${port}!`))
