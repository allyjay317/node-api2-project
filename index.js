const PORT = 5000

const express = require('express')
const server = express()
server.use(express.json())

server.post('/api/posts', (req, res) => {
  //   - If the request body is missing the `title` or `contents` property:

  //   - cancel the request.
  //   - respond with HTTP status code `400` (Bad Request).
  //   - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

  // - If the information about the _post_ is valid:

  //   - save the new _post_ the the database.
  //   - return HTTP status code `201` (Created).
  //   - return the newly created _post_.

  // - If there's an error while saving the _post_:
  //   - cancel the request.
  //   - respond with HTTP status code `500` (Server Error).
  //   - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.
})
server.post('/api/posts:id/comments', (req, res) => {
  //   - If the _post_ with the specified `id` is not found:

  //   - return HTTP status code `404` (Not Found).
  //   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

  // - If the request body is missing the `text` property:

  //   - cancel the request.
  //   - respond with HTTP status code `400` (Bad Request).
  //   - return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.

  // - If the information about the _comment_ is valid:

  //   - save the new _comment_ the the database.
  //   - return HTTP status code `201` (Created).
  //   - return the newly created _comment_.

  // - If there's an error while saving the _comment_:
  //   - cancel the request.
  //   - respond with HTTP status code `500` (Server Error).
  //   - return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.
})
server.get('api/posts', (req, res) => {
  // - If there's an error in retrieving the _posts_ from the database:
  // - cancel the request.
  // - respond with HTTP status code `500`.
  // - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.
})
server.get('/api/posts/:id', (req, res) => {
  //   - If the _post_ with the specified `id` is not found:

  //   - return HTTP status code `404` (Not Found).
  //   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

  // - If there's an error in retrieving the _post_ from the database:
  //   - cancel the request.
  //   - respond with HTTP status code `500`.
  //   - return the following JSON object: `{ error: "The post information could not be retrieved." }`
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