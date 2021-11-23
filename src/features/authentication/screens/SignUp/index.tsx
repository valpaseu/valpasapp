import React, { useState } from 'react'

import SignUpForm from 'features/authentication/components/SignUpForm'
import ConfirmForm from 'features/authentication/components/ConfirmForm'

export default function SignUpScreen() {
  const [userEmail, setUserEmail] = useState('')

  function handleUserEmail(email: string) {
    setUserEmail(email)
  }

  return !userEmail ? (
    <SignUpForm handleUserEmail={handleUserEmail} />
  ) : (
    <ConfirmForm userEmail={userEmail} handleUserEmail={handleUserEmail} />
  )
}
