import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const Post = ({ post }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ post_id: post.id, text: '' })
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/posts/${post.id}/comments`)
      .then(res => {
        setComments(res.data)
      })
  }, [])
  const insertNewComment = e => {
    e.preventDefault()
    Axios.post(`http://localhost:5000/api/posts/${post.id}/comments`, newComment)
      .then(res => {
        setComments([...comments, res.data])
        setNewComment({ post_id: post.id, text: '' })
      })
  }
  return (
    <div style={{ border: '1px solid black', flexGrow: '1' }}>
      <h4>{post.title}</h4>
      <p>{post.contents}</p>
      {comments.map(comment => <div style={{ borderTop: '1px dotted black' }}><p>{comment.text}</p></div>)}
      <form onSubmit={insertNewComment}>
        <input type='text' name='text' value={newComment.text} onChange={e => setNewComment({ ...newComment, text: e.target.value })} />
      </form>
    </div>
  )
}

export default Post