'use client'

import { useEffect, useState } from 'react'

import Globe from 'react-globe.gl'

import { useGetAllUsersQuery } from '@/redux-store/api/user'
import dynamic from 'next/dynamic'
import Loader from '@/components/loader'

const Users = () => {
  const { data: usersData, isLoading, isError } = useGetAllUsersQuery()

  const [pointsData, setPointsData] = useState([])
  const [places, setPlaces] = useState([])

  useEffect(() => {
    if (usersData?.length > 0) {
      console.log('>>>', usersData)
      const latLongData = []

      usersData.map(user => {
        if (user?.geo_data?.latitude) {
          latLongData.push({
            lat: user?.geo_data?.latitude,
            lng: user?.geo_data?.longitude,
            size: 0.5,
            user: user?.username
          })
        }
      })
      console.log('latLongDataL ', latLongData)
      setPointsData(latLongData)
      fetch('https://globe.gl/example/datasets/ne_110m_populated_places_simple.geojson')
        .then(res => res.json())
        .then(places => setPlaces(places))
    }
  }, [usersData])

  return (
    <div className='App'>
      {typeof window !== undefined && usersData?.length > 0 ? (
        <Globe
          width={'100%'}
          height={'100%'}
          pointsData={pointsData}
          pointLabel={p => p.user}
          pointColor={() => 'red'}
          globeImageUrl={'//unpkg.com/three-globe/example/img/earth-night.jpg'}
          bumpImageUrl={'//unpkg.com/three-globe/example/img/earth-topology.png'}
          backgroundImageUrl={'//unpkg.com/three-globe/example/img/night-sky.png'}
          labelsData={places.features}
          labelLat={d => d.properties.latitude}
          labelLng={d => d.properties.longitude}
          labelText={d => d.properties.name}
          labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
          labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
          labelColor={() => 'rgba(255, 165, 0, 0.75)'}
          labelResolution={2}
        />
      ) : isLoading ? (
        <Loader />
      ) : null}
    </div>
  )
}

export default Users
