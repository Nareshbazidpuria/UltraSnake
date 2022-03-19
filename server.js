const express = require('express')
const app = express()
const http = require('http').createServer(app)
let users= {};
const PORT = process.env.PORT || 80

http.listen(PORT, ()=>{
    console.log(`Listning on port ${PORT}`)
})

app.use(express.static(__dirname + '/Public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/snake.html')
})