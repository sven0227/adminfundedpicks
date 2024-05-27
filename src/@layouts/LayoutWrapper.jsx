'use client'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useLayoutInit from '@core/hooks/useLayoutInit'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const LayoutWrapper = props => {
  const router = useRouter()
  // Props
  const { systemMode, verticalLayout, horizontalLayout } = props

  useEffect(() => {
    if (!localStorage.getItem('profile')) {
      router.push('/login')
      toast.error('Session expired')
    }
  }, [])

  // Hooks
  const { settings } = useSettings()

  useLayoutInit(systemMode)

  // Return the layout based on the layout context
  return (
    <div className='flex flex-col flex-auto' data-skin={settings.skin}>
      {settings.layout === 'horizontal' ? horizontalLayout : verticalLayout}
    </div>
  )
}

export default LayoutWrapper
