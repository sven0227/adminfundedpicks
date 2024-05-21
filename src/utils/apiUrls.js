// base url
export const base_url = process.env.NEXT_PUBLIC_BASE_URL || ''
export const img_base_url = process.env.NEXT_PUBLIC__IMAGE_BASE_URL || ''

// auth
export const login_url = '/auth/login'

// user
export const user_url = '/users/'
export const purchase_url = '/purchases/'

export const auth_token_key = 'test'

// authorization headers
export const authorizationHeaders = headers => {
  const token = JSON.parse(localStorage.getItem(auth_token_key)).token
  headers.set('Authorization', `Bearer ${token}`)
  return headers
}

// get authorization token

export const getAuthToken = () => {
  const token = JSON.parse(localStorage.getItem(auth_token_key)).token
  return `Bearer ${token}`
}
