import convict from 'convict'

export const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  auth: {
    privateKey: {
      doc: 'The private key to sign JWT',
      default: 'tic-tac-trip',
    },
  },
  justify: {
    rateLimitByDay: {
      doc: 'The number of words allowed per day',
      default: 80_000,
    },
  },
})
