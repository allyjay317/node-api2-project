const PORT = 5000

const express = require('express')
const cors = require('cors')
const postsRouter = require('./Posts/post_router.js')

const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/posts/', postsRouter)



server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})