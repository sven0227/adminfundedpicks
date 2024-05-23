// isAuth.js
import { useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function isAuth(Component) {
  return function WithAuth(props) {
    const pathname = usePathname()
    const { data, isLoading, isLogout } = useSelector(state => state.auth)

    useEffect(() => {
      // Redirect if data is null
      if (!data) {
        redirect('/')
      }
    }, [data, isLoading])

    // Render loading state or null while waiting for data
    if (isLoading) {
      if (isLogout) {
        redirect('/login')
      }
      return null
    }

    return <Component {...props} />
  }
}
