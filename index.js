const PORT = 5000

const express = require('express')
const server = express()
const db = require('./data/db')
server.use(express.json())

server.post('/api/posts', (req, res) => {
  const body = req.body
  if (body.title && body.contents) {
    db.insert(req.body)
      .then(result => {
        db.findById(result.id)
          .then(createdPost => {
            res.status(201).json(createdPost[0])
          })
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
      })
  }
  else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
})
server.post('/api/posts/:id/comments', (req, res) => {
  const body = req.body
  const { id } = req.params
  if (body.text) {
    //comment has all neccecary values
    db.findById(id)
      .then(result => {
        if (result.length === 0) {
          res.status(404).json({ message: 'The post with the specified ID does not exist' })
        }
        else {
          //just in case of post_id not being included for some strange reason
          body.post_id = id
          db.insertComment(body)
            .then(done => {
              //comment inserted successfully, find and return newly created comment
              db.findCommentById(done.id)
                .then(ret => {
                  if (ret.length === 0) {
                    throw new Error('Something went wrong')
                  }
                  else {
                    //comment found successfully, return
                    res.status(201).json(ret[0])
                  }
                })
            })
        }
      })
      .catch(err => {
        //error while saving comment or fetching newly created comment
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
      })
  }
  else {
    //comment is missing values
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
  }
})
server.get('/api/posts', (req, res) => {
  db.find()
    .then(result => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(result => {
      if (result.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
      else {
        res.status(200).json(result)
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    })
})
server.get('/api/posts/:id/comments', (req, res) => {
  //   - If the _post_ with the specified `id` is not found:

  //   - return HTTP status code `404` (Not Found).
  //   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

  // - If there's an error in retrieving the _comments_ from the database:
  //   - cancel the request.
  //   - respond with HTTP status code `500`.
  //   - return the following JSON object: `{ error: "The comments information could not be retrieved." }`.
})
server.delete('/api/posts/:id', (req, res) => {
  //   - If the _post_ with the specified `id` is not found:

  //   - return HTTP status code `404` (Not Found).
  //   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

  // - If there's an error in removing the _post_ from the database:
  //   - cancel the request.
  //   - respond with HTTP status code `500`.
  //   - return the following JSON object: `{ error: "The post could not be removed" }`.
})
server.put('/api/posts/:id', (req, res) => {
  //   - If the _post_ with the specified `id` is not found:

  //   - return HTTP status code `404` (Not Found).
  //   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

  // - If the request body is missing the `title` or `contents` property:

  //   - cancel the request.
  //   - respond with HTTP status code `400` (Bad Request).
  //   - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

  // - If there's an error when updating the _post_:

  //   - cancel the request.
  //   - respond with HTTP status code `500`.
  //   - return the following JSON object: `{ error: "The post information could not be modified." }`.

  // - If the post is found and the new information is valid:

  //   - update the post document in the database using the new information sent in the `request body`.
  //   - return HTTP status code `200` (OK).
  //   - return the newly updated _post_.
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})