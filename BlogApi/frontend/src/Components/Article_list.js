


import React from 'react'
import {Link} from 'react-router-dom'
function Article_list(props) {
  return (
    <div>
        {props.articles[0] && props.articles.map(article => {
        return (
          <div className = "container mt-3" key={article.id}>
            <span className = "badge rounded-pill bg-success">Author:{article.author}</span>
            <h2> <Link to = {`/articles/${article.slug}`} className = "link-style" >{article.title}</Link></h2>
            <p><Link to = {`/articles/${article.slug}`} className = "link-style" >{article.description} </Link></p>
            
          </div>
        );
      })}
    </div>
  )
}

export default Article_list
