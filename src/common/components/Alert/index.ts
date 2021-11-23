import { Alert } from 'react-native'

import { AlertProps } from 'features/types'

export const AlertPopup = (alertArgs: AlertProps) => {
  const { title, message, buttons } = alertArgs
  Alert.alert(`${title}`, `${message}`, [...buttons], { cancelable: false })
}
