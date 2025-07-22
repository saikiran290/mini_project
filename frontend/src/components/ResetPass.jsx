import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 


const ResetPass = () => {
  const navigate = useNavigate();
  const { email } = useParams(); 
    const [pass,setPass] = useState('')
    const changePass = async(e) =>{
        e.preventDefault()
        try{
          let res = await axios.post(`/api/setPass/${email}`,{pass})
          if(res.data.set)
          {
            alert('password reset successfully ')
            navigate('/login')
          }
        setPass('')
        }
        catch(err)
        {}
    }
    return (
        <div className=' min-vh-100  d-flex justify-content-center align-items-center bg-dark'>
          <div className='card p-5 mt-5 shadow-lg rounded-5 justify-content-center align-items-center ' style={{margin:'40px',width:'525px'}}>
            <form className='form-group w-100' onSubmit={changePass}>
              <div className=''>
                <input 
                className='form-control mb-3' 
                name='password'
                value={pass}
                type='password' 
                onChange={(e)=>setPass(e.target.value)}
                placeholder='enter password' 
                required />
                <button className='btn btn-primary'>submit</button>
              </div>
            </form>
          </div>
        </div>
      )
}

export default ResetPass
