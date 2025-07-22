import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const date = new Date();
    date.setMinutes(date.getMinutes() + 15);

    const sendOtp = async (e) => {
        e.preventDefault();

        try {
            // Fixing API call
            let response = await axios.get(`/api/Finduser/${email}`);
            console.log(response)
            // Checking if the user exists
            if (response.data.userExist) {
                const otp = Math.floor(100000 + Math.random() * 900000);
                const expiryTime = Date.now() + 15 * 60 * 1000; // OTP expires in 15 mins
                await axios.post('/api/save-otp', { email, otp, expiryTime });
                const data = {
                    service_id: 'service_6if8ffj',
                    template_id: 'template_qqg9udy',
                    user_id: 'ZptoHDThWcTrz4SMG',
                    template_params: {
                        from: 'Spam Mail Classifier And Mail Summarizer',
                        email: email,
                        passcode: otp,
                        time: date.toLocaleString(),
                    }
                };

                await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);

                // Reset email input
                setEmail('');

                // Navigate to OTP page
                navigate(`/otp/${email}`);
            } else {
                alert('User not found! Redirecting...');
                navigate('/');
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center bg-dark'>
            <div className='card p-5 mt-5 shadow-lg rounded-5 justify-content-center align-items-center' style={{ margin: '40px', width: '525px' }}>
                <form className='form-group w-100' onSubmit={sendOtp}>
                    <div>
                        <input 
                            className='form-control mb-3' 
                            name='email'
                            value={email}
                            type='email'  // Changed to type='email' for validation
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter email' 
                            required 
                        />
                        <button className='btn btn-primary'>Send OTP</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPass;




// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'; 

// const ForgotPass = () => {
//     const[email,setEmail] = useState('');
//     const navigate = useNavigate();

//     const date = new Date();
//     date.setMinutes(date.getMinutes() + 15);


//     const sendOtp = async(e) =>{
//         e.preventDefault()
//         try{
//         let userExist = await axios.get(`api/Finduser/:${email}`)
//         if(userExist.data.userExist)
//         {
//           const otp = Math.floor(100000+Math.random()*900000);
//         const data = {
//             service_id: 'service_6if8ffj',
//             template_id: 'template_qqg9udy',
//             user_id: 'ZptoHDThWcTrz4SMG',
//             template_params: {
//               from:'Spam Mail Classifier And Mail Summarizer',
//               email:email,
//               passcode:otp,
//               time:date.toLocaleString(), 
//             }
//         }
//         let response = await axios.post("https://api.emailjs.com/api/v1.0/email/send",data);
//     console.log(response)
//         setEmail('')
//         navigate(`/otp/${email}`)
//         }
//         else{
//           navigate('/')
//         }
//     }
    
    
//     return (
//         <div className=' min-vh-100  d-flex justify-content-center align-items-center bg-dark'>
//           <div className='card p-5 mt-5 shadow-lg rounded-5 justify-content-center align-items-center ' style={{margin:'40px',width:'525px'}}>
//             <form className='form-group w-100' onSubmit={sendOtp}>
//               <div className=''>
//                 <input 
//                 className='form-control mb-3' 
//                 name='email'
//                 value={email}
//                 type='text' 
//                 onChange={(e)=>setEmail(e.target.value)}
//                 placeholder='enter email' 
//                 required />
//                 <button className='btn btn-primary'>Send OTP</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )
    
// }

// export default ForgotPass
