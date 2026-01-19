import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import axios from 'axios'
import './App.css'

function App() {

  // Maintains the Cloudflare Turnstile verification token for backend validation
  const [token, setToken] = useState<string>("")

  return (
    <>
      {/* Captures user-provided one-time password for identity verification */}
      <input placeholder='OTP'></input>

      {/* Captures the new credential value to be securely updated */}
      <input placeholder='New password'></input>

      {/*
        Embeds Cloudflare Turnstile widget to block bots and automate human verification
        onSuccess fires only when Cloudflare confirms the request is human-generated
      */}
      <Turnstile
        onSuccess={(token) => {
          // Stores bot-verification token for secure backend submission
          setToken(token)
        }}
        siteKey='0x4AAAAAAAXtEe2JIeAEUcjX'
      />

      {/* use a valid siteKey of cloudflare */}

      {/* Triggers secured password reset flow with OTP and Turnstile verification */}
      <button onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: "rashmi@gmail.com",
          otp: "123456",
          newPassword: "a_new_password",
          token: token,
        })
      }}>
        Update password
      </button>
    </>
  )
}

export default App
