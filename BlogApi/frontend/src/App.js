import './App.css';
import React, { useState, useEffect } from 'react';
import Article_list from './Components/Article_list';
import Navbar from './Components/Navbar';
import {Routes, Route} from 'react-router-dom'
import Login from './Components/Login';

import { useNavigate } from 'react-router-dom'
import Article_details from './Components/Article_details';
import AddArticle from './Components/AddArticle';
import Chat from './Components/Chat';
import Register from './Components/Register';
import UpdateArticle from './Components/UpdateArticle';
function App() {
  const [articles, setArticles] = useState([])
  const [editArticle, setEditedArticle] = useState('')
  const token =  localStorage.getItem('mytoken')
  let navigate = useNavigate()
  useEffect(() => {
    fetch('http://127.0.0.1:8000/articles/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    .then(resp => resp.json())
    .then(result => {
      console.log(result);
      setArticles(result); // Assuming the result is an array of articles
    })
    .catch(error => {
      console.error('Error fetching articles:', error);
    });
  }, [token])
   // Empty dependency array to run the effect only once
  useEffect(() =>{
    if(!token) {
      navigate("/")
      return;
    }
    navigate("/articles")

  },[token]
  )
  const insertedArticle = (article) => {
    const new_articles = [...articles,article]
    setArticles(new_articles)
  }
  const updatedData = (article) => {
    const new_articles = articles.map(myarticle => {
      if(myarticle.slug === article.slug) {
        return article
      } else {
        return myarticle
      }
    })
    setArticles(new_articles)
  }
  const updateBtn = (article) => {
    setEditedArticle(article)

  }
  const deleteBtn = (article) =>{
    const new_articles = articles.filter(myarticle => {
      if(myarticle.slug === article.slug){

        return false;
      }
      return true;
    })
    setArticles(new_articles)
  }
  return (
    <div>
    <Chat/>
    <Navbar/>
    <Routes>
        <Route path = "/" element = {<Login/>}  ></Route>
        <Route path = "/articles" element = {
          <Article_list articles = {articles}/>
        }></Route>
        <Route path = "/articles/:slug" element = {
          <Article_details deleteBtn = {deleteBtn} updateBtn = {updateBtn} />
        }></Route>

        <Route path = "/add" element = {
          <AddArticle insertedArticle = {insertedArticle}/>
        }></Route>

        <Route path = "/register" element = {
          <Register/>
        }></Route>
        <Route path = "/update" element = {
          <UpdateArticle article = {editArticle} updatedData = {updatedData}/>
        }></Route>
    </Routes>
    
    </div>
  );
}

export default App;
