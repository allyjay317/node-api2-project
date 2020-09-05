import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios'
import Post from './components/post';

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:5000/api/posts')
      .then(res => {
        setPosts(res.data)
      })
  }, [])
  const removePost = post => {
    Axios.delete(`http://localhost:5000/api/posts/${post.id}`)
      .then(res => {
        setPosts(posts.filter(p => p.id !== post.id))
      })
  }
  const editPost = post => {

  }
  return (
    <div className="App">
      {posts.map(post => {
        return (
          <div style={{ display: 'flex' }}>
            <Post post={post} />
            <button onClick={() => removePost(post)}>Remove</button>
            <button onClick={() => editPost(post)}>Edit</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
