import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    async function login() {
        const user = {
            email,
            password,
        }
        if (!password || !email) {
            alert("please fill the form completely")
          }else{
            try {
                const result = await axios.post('/api/users/login', user)
                localStorage.setItem('currentuser', JSON.stringify(result))
                navigate('/home')
            } catch (err) {
                alert("invalid email or password")
                console.log(err);
             
               
            }
        }

          }
       
    return (
        <>
            <div>
                <form className='w-25 border mt-5 border-2 mx-auto p-5 rounded bs' style={{ backgroundColor: "whitesmoke" }}>
                    <h2 className='text-center text-primary mb-4'>Login</h2>
                    <input type="email" className='form-control mt-3' placeholder='email'
                        value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" className='form-control mt-3' placeholder='password'
                        value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <div class="text-center mt-3">
                        <button type="button" className='btn btn-primary mt-2' onClick={login}>Login</button>
                    </div>

                    <p className='mt-2'>New User? Click here to <a href="/register">Register</a></p>
                </form>

            </div>
        </>
    )
}

export default Login