const express = require('express')

const db = require('../data/db')

const router = express.Router()

router.post('/', (req, res) => {
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
router.post('/:id/comments', (req, res) => {
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
router.get('/', (req, res) => {
  db.find()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})
router.get('/:id', (req, res) => {
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
router.get('/:id/comments', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(result => {
      if (result.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
      else {
        db.findPostComments(id)
          .then(postComments => {
            res.status(200).json(postComments)
          })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})
router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(result => {
      if (result.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
      else {
        db.remove(id)
          .then(deleted => {
            res.status(204).end()
          })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" })
    })
})
router.put('/:id', (req, res) => {
  const body = req.body
  const { id } = req.params
  if (body.title && body.contents) {
    db.findById(id)
      .then(result => {
        if (result.length === 0) {
          res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else {
          db.update(id, body)
            .then(completed => {
              db.findById(id)
                .then(updated => {
                  res.status(200).json(updated[0])
                })

            })
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
      })
  }
  else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
})

module.exports = router