
import { useState, useEffect } from 'react'

import { useParams, Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import React from 'react'

import APIService from '../Components/APIService';

function Article_details(props) {
    const params = useParams()
    const [article, setArticle] = useState({})
    const token = localStorage.getItem('mytoken')
    const [req, setReq] = useState('')
    let navigate = useNavigate()
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
    },[params.slug,token])

    useEffect(() => {
       fetch('http://127.0.0.1:8000/rest-auth/user/',{
        mehtod:"GET",
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`

       }

    })
    .then(resp => resp.json())
    .then(result => setReq(result))
    .catch(error => console.log(error))
  },[token])

    const updateBtn = (article) => {
      props.updateBtn(article)
    }

    const deleteBtn = (article) =>{
     APIService.DeleteArticle(article.slug, token)
     .then(() => {
      props.deleteBtn(article);
      navigate('/articles')
     }
     )
     .catch(error => console.log(error))
    }
    
    

  return (
    <div className = "container mt-4" key = {article.id}>
        <h2>{article.title}</h2>
        <h6>
            Published {article.published} by <i>{article.author}</i>
        </h6>
        <br/>
        <p>{article.description}</p>

  
        {req.username === article.author  ?
        <div>

        <button onClick = { () => deleteBtn(article)}className = "btn btn-danger mx-1 mt-1">Delete</button>
        <Link to = "/update"><button onClick = {() => updateBtn(article)} className = "btn btn-success   mx-1 mt-1">Update</button></Link>
        </div>
        : 
        null
        }
    </div>
  )
}

export default Article_details
