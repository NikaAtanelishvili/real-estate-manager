import { useState, useCallback } from 'react'

const useFetchListings = () => {
  const [listings, setListings] = useState([])

  const fetchListings = useCallback(async () => {
    try {
      const response = await fetch(
        'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer 9cfeab72-0976-4200-8c9c-3d87ddecf868',
          },
        },
      )

      switch (response.status) {
        case 200: {
          const data = await response.json()
          console.log(data)
          setListings(data)
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

  return { listings, fetchListings }
}

export default useFetchListings
