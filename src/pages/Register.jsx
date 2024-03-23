import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const navigate = useNavigate()
  async function register() {
    if (password === cpassword) {
      if (!name || !email || !password || !cpassword) {
        alert("Please fill the form completely");
      } else {
        try {
          const user = {
            name,
            email,
            password,
            cpassword
          };

          const result = await axios.post('/api/users/register', user);
          // Assuming you want to navigate after successful registration
          navigate('/login'); // Navigate to the success page

          setName('');
          setEmail('');
          setPassword('');
          setCpassword('');
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Passwords do not match");
    }
  }
  return (
    <>
      <div>

        <form className='w-25 border mt-5 border-2 mx-auto p-5 rounded bs' style={{ backgroundColor: "whitesmoke" }}>
          <h2 className='text-center text-primary mb-4'>Register</h2>
          <input type="text" className='form-control mt-3' placeholder='name'
            value={name} onChange={(e) => { setName(e.target.value) }} />
          <input type="email" className='form-control mt-3' placeholder='email'
            value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input type="password" className='form-control mt-3' placeholder='password'
            value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <input type="password" className='form-control mt-3' placeholder='confirm password'
            value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />
          <div class="text-center mt-3">
            <button type="button" className='btn btn-primary mt-2' onClick={register}>Register</button>
          </div>

          <p className='mt-2' >Already a User?Click here to <a href="/login">Login</a></p>
        </form>
      </div>


    </>
  )
}

export default Register