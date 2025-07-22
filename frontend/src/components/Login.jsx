import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();
  
//oAuth- codeStart
  const google = () => {
    window.location.href = "http://localhost:5000/auth/google";  // Redirect to backend Google OAuth
};

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    localStorage.setItem('token', token); // Store token in localStorage
    navigate('/mail'); // Redirect to mail page
  }
}, [navigate]);
//oAuth -finish

  const loginValues = async(e) =>{
    e.preventDefault()
    try{
      const response = await axios.post('/api/login',{email,password})
      if(response.data.token)
      {
      localStorage.setItem('token', response.data.token);
      console.log(response)
      navigate('/mail')
      }
      else{
        navigate('/register')
      }
    }
    catch(err){
      console.log(err)
    }
    setEmail('')
    setPassword('')
  };

  return (
    <div className=' min-vh-100  d-flex justify-content-center align-items-center bg-dark'>
      <div className='card p-5 mt-5 shadow-lg rounded-5 justify-content-center align-items-center ' style={{margin:'40px',width:'525px'}}>
        <h1 className='mb-5 text-center text-primary'>Login Form</h1>
        <form className='form-group w-75' onSubmit={loginValues}>
          <div className='mb-3'>
            <input 
            className='form-control ' 
            name='email'
            value={email}
            type='text' 
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='enter email' 
            required />
          </div>
          <div className='mb-3'>
            <input 
            className='form-control ' 
            type='password' 
            name='password'
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            placeholder='enter password' 
            required />
          </div>
          <button className='btn btn-primary w-100 mb-2 ' type='submit' >Login <i className="bi bi-box-arrow-in-right me-2"></i></button>
          <div><a className='btn  mb-3' href='/forgot'> forgot password ?</a></div>
          <div className='justify-content-center align-items-center d-flex flex-column'>
          <p>Don't have an account ? <a className='text-danger btn-link mb-2' href='/register'>Register</a></p>
          <p className='text-muted mb-2'>Or</p>
          <button className='text-primary btn' onClick={google}><span className="bi bi-google me-2" ></span>Sign in with Google </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
