'use client'

import dynamic from 'next/dynamic'

const DynamicUsers = dynamic(() => import('./Users'), {
  loading: () => <p>Loading...</p>
})

export default function Home() {
  return <DynamicUsers />
}
