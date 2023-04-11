import { Magic, RPCError, RPCErrorCode } from 'magic-sdk'
import { Magic as MagicServer } from '@magic-sdk/admin'

// creates instance only on client
const createMagic = (key: string) => {
  if (typeof window != 'undefined') {
    const magicInstance = new Magic(key)

    // @ts-expect-error used for testing

    window.magic = magicInstance

    return magicInstance
  }
}

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)

export const getUserMetadata = () => {
  return magic.user.getMetadata()
}

export const createMagicUser = async (phoneNumber: string) => {
  try {
    await magic.auth.loginWithSMS({ phoneNumber })
    // const metadata = await getUserMetadata()

    // trackUserInfo({
    //   identity: metadata.phoneNumber,
    //   phone: metadata.phoneNumber,
    // })

    // TODO: fix small flash on transition
    return Promise.resolve(true)
  } catch (err) {
    // TODO: add error handling
    if (err instanceof RPCError) {
      switch (err.code) {
        case RPCErrorCode.AccessDeniedToUser:
        case RPCErrorCode.MagicLinkRateLimited:
        case RPCErrorCode.UserAlreadyLoggedIn:
          // TODO:
          // Handle errors accordingly :)
          console.error(err)
          break
      }
    } else {
      console.error(err)
    }
    return Promise.reject(false)
  }
}
