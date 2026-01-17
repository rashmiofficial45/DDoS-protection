import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import axios from 'axios'
import './App.css'

function App() {
  const [token, setToken] = useState<string>("")
  return (
    <>
      <input placeholder='OTP'></input>
      <input placeholder='New password'></input>

      <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey='0x4AAAAAAAXtEe2JIeAEUcjX' />
      {/* use a valid siteKey of cloudflare */}

      <button onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: "harkirat@gmail.com",
          otp: "123456",
          token: token,
        })
      }}>Update password</button>
    </>
  )
}

export default App
