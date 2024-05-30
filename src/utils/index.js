import axios from 'axios'
import { toast } from 'react-toastify'
import { auth_token_key, base_url, getAuthToken } from './apiUrls'
// import { userApi } from '@/redux-store/api/user'
import { store } from '@/redux-store'

export const apiResponseError = error => (error.data.message ? error.data.message : 'Something went wrong')

// reusable try catch function
export const tryCatchFn = async (
  action,
  successCallback = () => {},
  errorCallback = () => {},
  actionType = 'success'
) => {
  try {
    const data = await action()
    if (successCallback !== 'null') {
      toast.dismiss()
      successCallback(data)
      if (actionType === 'null') {
        return
      }
      if (actionType === 'success') {
        toast.success(data.message)
      } else if ('warning') {
        toast.warning(data.message)
      } else {
        toast.danger(data.messsage)
      }
    }
  } catch (error) {
    if (error.status === 401) {
      toast.error(error.data.message)
      removeRtkQueryApisData()
      // store.dispatch(removeLoginData())
    }
    errorCallback(error)
    toast.error(apiResponseError(error))
  }
}

//  get data and time

export const getDateTime = timeStamp => {
  const date = new Date(timeStamp)

  const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCFullYear()}`
  const formattedTime = `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`

  return { dateTime: `${formattedDate} ${formattedTime}`, date: formattedDate, time: formattedTime }
}

// query function

export const queryFn = async url => {
  try {
    const result = await axios(base_url + url, {
      headers: {
        Authorization: getAuthToken()
      }
    })
    return { data: result.data }
  } catch (axiosError) {
    console.log(axiosError, 'axios error....')
    const err = axiosError
    // toast.error(err.response.data.message)
    unAuthorizationHandler(err)
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message
      }
    }
  }
}

// unauthorization handler

export const unAuthorizationHandler = error => {
  console.log(error)
  if (error.response?.status == 401) {
    store.dispatch(removeLoginData())
    window.location.href = '/login'
    removeRtkQueryApisData()
  }
}

// bad request handler

export const badRequestHandler = error => {
  if (error.response?.status === 400) {
    // store.dispatch(removeLoginData())
    // removeRtkQueryApisData();
  }
}

export const removeLoginData = () => {
  localStorage.removeItem(auth_token_key)
  localStorage.removeItem('profile')
}

//function removes whole rtk query data

export const removeRtkQueryApisData = () => {
  localStorage.removeItem(auth_token_key)
  // store.dispatch(userApi.util.resetApiState())
}

// function to slice text

export const sliceString = (str = '', endNum) => {
  return str.length > endNum ? str.slice(0, endNum) + '....' : str
}

// currency

export const currencySymbol = '$'

// get percentage

export const calculatePercentageAmount = (amount, percentage) => {
  return amount * percentage
}

export const alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]
