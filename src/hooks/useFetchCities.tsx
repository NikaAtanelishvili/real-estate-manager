import { CityType } from '@/types'
import { useState, useCallback } from 'react'

const useFetchCities = () => {
  const [cities, setCities] = useState<CityType[]>([])

  const fetchCities = useCallback(async () => {
    try {
      const response = await fetch(
        'https://api.real-estate-manager.redberryinternship.ge/api/cities',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer 9d05d85b-41d1-4d0d-9779-85c35560821f',
          },
        },
      )

      switch (response.status) {
        case 200: {
          const data = await response.json()
          setCities(data)
          break
        }

        case 401: {
          const error = await response.json()
          throw new Error(error.message || 'Please provide a valid API token')
        }

        case 500: {
          const error = await response.json()
          throw new Error(error.message || 'Network response is unavailable')
        }

        default: {
          const error = await response.json()
          throw new Error(
            error.message || `Unexpected status code: ${response.status}`,
          )
        }
      }
    } catch (error) {
      console.error('Error fetching real estates:', error)
    }
  }, [])

  return { cities, fetchCities }
}

export default useFetchCities
