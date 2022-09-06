import jwt, { SignOptions } from 'jsonwebtoken'
import config from 'config'

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  return jwt.sign(payload, config.get<string>(keyName), {
    ...(options && options),
  })
}

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    return jwt.verify(token, config.get<string>(keyName)) as T
  } catch (error) {
    return null
  }
}
