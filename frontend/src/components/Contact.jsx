import React, { useState } from 'react'
import axios from 'axios'

const Contact = () => {
  const[name,setName]=useState('')
  const[mail,setMail]=useState('')
  const[message,setMessage]=useState('')

  const data = {
    service_id: 'service_byja9ss',
    template_id: 'template_os1b2hv',
    user_id: '1AkkQUzulb47tnD_U',
    template_params: {
      to_name:'Rakesh',
      from_name:name,
      message:message,
      from_email:mail
    }
};


  const submitHandler = async(e) =>{
    e.preventDefault()
    let response = await axios.post("https://api.emailjs.com/api/v1.0/email/send",data) 
    console.log(name,mail,message,response)
    alert('Message Sent Successfully')
    setName('')
    setMail('')
    setMessage('')
  }
  return (
    <div className='p-5 mt-5 '>
      <h1 className='text-center'>Contact Us</h1>
      <form onSubmit={submitHandler} className='form-group'>
        <input
        className='form-control mb-3'
        type='text'
        placeholder='enter name'
        name='name'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}/>
        <input
        className='form-control mb-3'
        type='mail'
        placeholder='enter your mail'
        name='mail'
        value={mail}
        onChange={(e)=>{setMail(e.target.value)}}/>
        <textarea 
        className='form-control mb-3'
        placeholder='enter message'
        name='message'
        rows={12}
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}/>
        <div className='text-right'><button className='btn btn-success'>Send Message</button></div>
      </form>
    </div>
  )
}

export default Contact
