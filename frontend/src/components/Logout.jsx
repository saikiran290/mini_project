import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate = useNavigate()
    const out = async() =>{
      const response = await axios.get('/logout')
      if(response){navigate('/login')}
    }
  return (  
    <>
    <button onClick={out}>logout</button>
    </>
  )
}

export default Logout
