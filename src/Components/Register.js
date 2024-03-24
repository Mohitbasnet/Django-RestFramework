


import React, {useState} from 'react'
import APIService from './APIService';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    let navigate = useNavigate()

    const register = () => {
        APIService.RegisterUser({username,email,password1,password2})
        .then( () =>{
            navigate('/')

        }

        )
        .catch(error => console.log(error))

    }
  return (
    <div className = "container mt-5">
        <h1> 
            Register Account
        </h1>
        <div className = "mb-3">
            <input type = "text" className = "form-control"
            placeholder = "Please Enter Username"
            value = {username}
            onChange = {evt => setUsername(evt.target.value)}
            />

        </div>

        <div className = "mb-3">
            <input type = "text" className = "form-control"
            placeholder = "Please Enter Email"
            value = {email}
            onChange = {evt => setEmail(evt.target.value)}
            />

        </div>
        <div className = "mb-3">
            <input type = "password" className = "form-control"
            placeholder = "Please Enter Password"
            value = {password1}
            onChange = {evt => setPassword1(evt.target.value)}
            />

        </div>
        <div className = "mb-3">
            <input type = "password" className = "form-control"
            placeholder = "Confirm Password"
            value = {password2}
            onChange = {evt => setPassword2(evt.target.value)}
            />

        </div>
        <div className = "mb-3">
            <button onClick = {register} className = "btn btn-success">Register User</button>

        </div>
      
      
    </div>
  )
}

export default Register
