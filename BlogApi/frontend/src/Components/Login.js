


import React, { useState } from 'react'; 

import {useNavigate} from 'react-router-dom'
function Login() {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState('')

    let navigate = useNavigate()
    const login = () => {
        fetch('http://127.0.0.1:8000/rest-auth/login/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body:JSON.stringify({username,password})
        })
        .then(resp => resp.json())
        .then(result => {
            if(result.key === undefined) {
                setError("Invalid username or password")
                return 
            }
            localStorage.setItem('mytoken', result.key)
            navigate("/articles")
        })
    }
  return (
    <div className = "container mt-4">
        <br/>
        {error ?
           <div className = "alert alert-warning alert-dismissible" role = "alert" >
            <p>{error}</p>
            </div>
            :

            null
        }
        <h1>Please Login Here</h1>

        <div className = "mb-3">
            <input type = "text" className = "form-control"
            name = "username" placeholder = "Please Enter Username"
            value = {username}
            onChange = {evt => setUsername(evt.target.value)}
            /> 

        </div>

        
        <div className = "mb-3">
            <input type = "password" className = "form-control"
            name = "password" placeholder = "Please Enter Password"
            value = {password}
            onChange = {evt => setPassword(evt.target.value)}
            /> 

        </div>
        <div className = "mb-3">
            <button onClick = {login} className = "btn btn-success " > Login</button>

        </div>
    </div>
  )
}

export default Login
