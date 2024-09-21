import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: false,
      required: false
    },
    profilePicture: {
      mutable: true,
      required: false
    },
    phoneNumber: {
      mutable: true,
      required: false
    },
    givenName: {
      mutable: true,
      required: false
    },
    familyName: {
      mutable: true,
      required: false
    }
  },
  multifactor: {
    mode: 'OPTIONAL',
    totp: true
  },
  groups: ['ADMINS', 'MANAGERS', 'USERS']
});
