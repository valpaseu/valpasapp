import { ReactNode } from 'react'

export type AlertProps = {
  title: string
  message: string
  buttons: { text: string; onPress?: () => void }[]
}

export type ValueSignInForm = {
  name: string
  password: string
}

export type ChallengeName =
  | 'SMS_MFA'
  | 'SOFTWARE_TOKEN_MFA'
  | 'SELECT_MFA_TYPE'
  | 'MFA_SETUP'
  | 'PASSWORD_VERIFIER'
  | 'CUSTOM_CHALLENGE'
  | 'DEVICE_SRP_AUTH'
  | 'DEVICE_PASSWORD_VERIFIER'
  | 'ADMIN_NO_SRP_AUTH'
  | 'NEW_PASSWORD_REQUIRED'

export type SignInUserSession = {
  accessToken: {
    jwtToken: string
  }
  idToken: {
    payload: {
      email: string
      email_verified: string
      phone_number: string
      phone_number_verified: string
    }
  }
}

export type AuthResponse = {
  challengeName: ChallengeName
  signInUserSession: SignInUserSession
}

export type EmailForgotPassword = {
  email: string
}

export type ResetPasswordProps = {
  route: {
    params: {
      email: string
    }
  }
}

export type ValueForgotPasswordForm = {
  email: string
  code: string
  newPassword: string
  confirmPassword: string
}

export type ValueSignUpForm = {
  name: string
  email: string
  password: string
}

export type FlatListItemProps = {
  image: { url: string }
  title: string
  description: string
}

export type OnBoardingItemProps = {
  title: string
  photoUrl: string
  hashTags: string[]
  content: {
    paragraph: string
    paragraphPhoto: string
  }[]
}

export type PositionDetailInfoCardProps = {
  title: string
  children: ReactNode
}

export type Company = {
  name: string
  about: string
  logo: {
    url: string
  }
}

export type Blog = {
  text: string
  referenceImage: {
    url: string
  }
}

export type JobPosition = {
  sys: {
    id: string
    publishedAt: string
  }
  title: string
  company: Company
  location: string
  jobType: string
  pay: number
  benefits: string
  requirements: string
}

export type ApiResponseContent = {
  items: JobPosition[] | OnboardingContent[] | WelcomeContent[]
}

export type ContentfulApiResponse = {
  [collectionName: string]: ApiResponseContent
}

export type OnboardingContent = {
  sys: {
    id: string
    publishedAt: string
  }
  title: string
  hashtags: string[]
  thumbnailImage: {
    url: string
  }
  blogPostCollection: {
    items: Blog[]
  }
}

export type WelcomeContent = {
  sys: {
    id: string
    publishedAt: string
  }
  title: string
  description: string
  image: {
    url: string
  }
}

export type JobProps = {
  item: JobPosition
  onItemPress: (item: JobPosition) => void
  isHorizontal?: boolean
}

export type ProfileBioProps = {
  bioDesc: string
}

export type ProfileHeaderProps = {
  photoUrl: string
  name: string
  email: string
  futureShifts: { time: string; location: string }[]
  earnedIncome: string
}

export interface IRoute {
  key: string
  name: string
}

export interface IOnBoardingRoute extends IRoute {
  params: {
    title: string
    photoUrl: string
    content: {
      text: string
      referenceImage: { url?: string }
    }[]
    itemID: string
  }
}

export interface IPositionRoute extends IRoute {
  params: {
    item: JobPosition
  }
}
export interface MessageRoute extends IRoute {
  params: MessageitemProps
}

export interface MessageitemProps {
  title: string
  message: string
  image: string
  time: Date
  timeFrom?: string
  sender?: string
}
