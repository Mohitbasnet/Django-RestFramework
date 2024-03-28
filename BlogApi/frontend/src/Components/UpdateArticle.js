


import React ,{useEffect ,useState} from 'react'
import APIService from '../Components/APIService';

import { useNavigate } from 'react-router-dom'
function UpdateArticle(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const token = localStorage.getItem('mytoken')
    let navigate = useNavigate()

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
    },[props.article])
    const updateArticle = () => {
        if (props.article && props.article.slug) {
            APIService.UpdateArticle(props.article.slug, { title, description }, token)
                .then(resp => {
                    props.updatedData(resp)
                    navigate('/articles')
                })
                .catch(error => console.log(error))
        } else {
            console.error("Article slug is undefined.")
        }
    }
    
  return (
    <div className = 'container mt-5'>
        <h2> Update Article</h2> 
            <div className = "mb-3">
                <input type = "text" className = "form-control"
                    placeholder = "Please Enter Title"
                    value = {title}
                    onChange = {evt => setTitle(evt.target.value)}
                />

            </div>
            <div className = "mb-3">
                <textarea className = "form-control"
                rows = "5"
                value = {description}
                onChange = {evt => setDescription(evt.target.value)}
                /> 
            </div>
            <div className = "mb-3">
                <button onClick = {updateArticle} className = "btn btn-success">
                    Update Article
                </button>
            </div>
    </div>
  )
}

export default UpdateArticle
