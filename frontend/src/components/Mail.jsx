import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Mail = () => {
  const[name,setName]=useState('')
  const[emailText,setEmailText]=useState('')
  const[action,setAction]=useState('/api/summarize')
  const navigate = useNavigate()

  const allMail = () =>{
    navigate('/allmails')
  }

  const formHandler = async(e) =>{
    e.preventDefault()
    try{
      let response = await axios.post(action,{emailText,name})
      console.log(response)
      navigate('/result', { state: { result: response.data.result , type: action } });
    }
    catch(err)
    {
      console.log(err)
    }
    setName('')
    setEmailText('')
  }
  return (    
    <div className='container-fluid p-5 mt-5'>
      <button onClick={allMail} className='btn btn-primary mt-2'>All Uploaded Mails </button>
      <form className='form-group' onSubmit={formHandler}>
        <input
        className="form-control mt-2 mb-2" 
        type='text' 
        placeholder='enter purpose of use eg: summary or concise' 
        name='name'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        />
        <textarea 
        className="form-control mb-2" 
        rows={18}  
        placeholder='enter mail or paste mail' 
        name='emailText'
        value={emailText}
        onChange={(e)=>{setEmailText(e.target.value)}}
        />
        <button type='submit' className='btn btn-primary ml-3' onClick={()=>setAction('/api/summarize')}>Summary</button>
        <button type='submit' className='btn btn-primary ms-3' onClick={()=>setAction('/api/classify')}>Classify</button>
      </form>
    </div>
  )
}

export default Mail
