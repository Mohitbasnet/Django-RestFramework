
import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'


import React from 'react'


function Article_details() {
    const params = useParams()
    const [article, setArticle] = useState({})
    const token = localStorage.getItem('mytoken')
    
    useEffect (() => {
        fetch(`http://127.0.0.1:8000/articles/${params.slug}`,{
            mehtod:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              }
        })
        .then(resp => resp.json())
        .then(result => setArticle(result))
        .catch(error => console.log(error))
    },[token])

   
    
    

  return (
    <div className = "container mt-4" key = {article.id}>
        <h2>{article.title}</h2>
        <h6>
            Published {article.published} by <i>{article.author}</i>
        </h6>
        <br/>
        <p>{article.description}</p>
    </div>
  )
}

export default Article_details
