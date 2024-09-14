import { ListingDetailsType } from '@/types'
import { useState, useEffect, useCallback } from 'react'

const useFetchListingDetails = (id: string) => {
  const [listingDetails, setListingDetails] =
    useState<ListingDetailsType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchListingDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
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
          setListingDetails(data)
          break
        }
        case 401: {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Please provide valid API token')
        }
        case 404: {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Real estate not found')
        }
        case 500: {
          const errorData = await response.json()
          throw new Error(
            errorData.message || 'Network response is unavailable',
          )
        }
        default: {
          const errorData = await response.json()
          throw new Error(
            errorData.message || `Unexpected status code: ${response.status}`,
          )
        }
      }
    } catch (err) {
      console.error('Error fetching real estate details:', err)
      setError(err as string)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchListingDetails()
    }
  }, [id, fetchListingDetails])

  return { listingDetails, error }
}

export default useFetchListingDetails
