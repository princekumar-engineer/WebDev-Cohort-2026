import JWT from 'jsonwebtoken'

export interface UserTokenPayload {
    id: string
}

const JWT_SECRET = process.env.JWT_SECRET as string

export function createUserToken(payload: UserTokenPayload) {
    return JWT.sign(payload, JWT_SECRET)
}

export function verifyUserToken(token: string) {
    try {
        return JWT.verify(token, JWT_SECRET) as UserTokenPayload
    } catch (error) {
        return null
    }
}