// base url
export const base_url = process.env.NEXT_PUBLIC_BASE_URL || ''
export const img_base_url = process.env.NEXT_PUBLIC__IMAGE_BASE_URL || ''

// auth
export const login_url = '/sign-in/'

// user
export const user_url = '/users/'
export const purchase_url = '/purchases/'
export const bet_url = '/bets/'
export const payout_url = '/payouts/list/'
export const payout_detail_url = '/payouts/'
export const payout_update_url = 'payouts/update/'

export const challenge_status_url = '/challenge-status/'

export const auth_token_key = 'token'
export const challenge_status = 'challenge-status'
export const dashboard_url = '/dashboard-data'
export const challenge_url = '/commerce/'

// get authorization token

export const getLoginUserToken = () => {
  return typeof window !== 'undefined' ? window.localStorage.getItem(auth_token_key) : ''
}

// authorization headers
export const authorizationHeaders = headers => {
  const token = getLoginUserToken()
  headers.set('Authorization', `Bearer ${token}`)
  return headers
}

// get authorization token

export const getAuthToken = () => {
  const token = getLoginUserToken()
  return `Token ${token}`
}
