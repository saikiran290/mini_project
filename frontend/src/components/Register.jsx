import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')  // State for error messages
    const navigate = useNavigate()

    const formHandle = async (e) => {
        e.preventDefault()
        setError('') // Reset previous errors
        
        try {
            let userResponse = await axios.post('/api/createUser', {
                firstname, lastname, username, email, password
            })

            // Store token in localStorage
            localStorage.setItem('token', userResponse.data.token)

            // Navigate to login or dashboard
            navigate('/login') 

        } catch (err) {
            console.error(err)
            setError(err.response?.data?.error || "Registration failed. Please try again.") // Show error
        }

        // Clear input fields only if registration succeeds
        setFirstname('')
        setLastname('')
        setUsername('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className="container-fluid d-flex flex-column w-50 align-items-center justify-content-center" style={{ marginTop: '90px' }}>
            <form className="form-group p-3" onSubmit={formHandle}>
                <h1 className='text-center mb-4'>Register Page</h1>
                
                {error && <p className="text-danger text-center">{error}</p>} {/* Show error messages */}

                <div className="name row">
                    <div className="col-md-6">
                        <input 
                            className="form-control mb-2" 
                            type="text" 
                            placeholder="Enter First Name" 
                            name="firstname"
                            value={firstname} 
                            onChange={(e) => setFirstname(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="col-md-6">
                        <input 
                            className="form-control mb-2" 
                            type="text" 
                            placeholder="Enter Last Name" 
                            name="lastname"
                            value={lastname} 
                            onChange={(e) => setLastname(e.target.value)}
                            required 
                        />
                    </div>
                </div>
                
                <input 
                    className="form-control mb-2" 
                    type="text" 
                    placeholder="Enter Username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
                
                <input 
                    className="form-control mb-2" 
                    type="email" 
                    placeholder="Enter Email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                
                <input 
                    className="form-control mb-3" 
                    type="password" 
                    placeholder="Enter Password" 
                    name="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />

                <div className="d-flex justify-content-end">
                    <button className="btn mr-3 w-25 btn-outline-primary">Register</button>
                </div>
            </form>
            
            <div className="d-flex justify-content-center mt-3">
                <p>If you already have an account, <a href="/login" className="text-danger">Login</a></p>
            </div>
        </div>
    )
}

export default Register
