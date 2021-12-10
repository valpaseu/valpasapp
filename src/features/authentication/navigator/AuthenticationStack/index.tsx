import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import routes from 'constants/routes'
import ApplicantSignIn from 'features/authentication/screens/ApplicantSignIn'
import SignIn from 'features/authentication/screens/SignIn'
import CompleteNewPassword from 'features/authentication/screens/ApplicantSignIn/CompleteNewPassword'
import SignUp from 'features/authentication/screens/SignUp'
import ForgotPassword from 'features/authentication/screens/ForgotPassword'
import ResetPassword from 'features/authentication/screens/ResetPassword'
import ProfileForm from 'features/authentication/screens/ProfileForm'

function AuthenticationStack() {
  const Stack = createStackNavigator()
  const { applicantSignIn, signIn, completeNewPassword, signUp, forgotPassword, resetPassword } = routes.authentication

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={signIn.screen} component={SignIn} />
      <Stack.Screen name={completeNewPassword.screen} component={CompleteNewPassword} />
      <Stack.Screen name={applicantSignIn.screen} component={ApplicantSignIn} />
      <Stack.Screen name={signUp.screen} component={SignUp} />
      <Stack.Screen name={"Profile Form"} component={ProfileForm}/>
      <Stack.Screen name={forgotPassword.screen} component={ForgotPassword} />
      <Stack.Screen name={resetPassword.screen} component={ResetPassword} />
    </Stack.Navigator>
  )
}

export default AuthenticationStack
