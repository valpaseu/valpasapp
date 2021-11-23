import { ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext) => ({
  ...config,
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'integrify',
          project: 'yard',
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
})
