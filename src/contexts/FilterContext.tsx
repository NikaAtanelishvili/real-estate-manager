import { createContext, useState, ReactNode, useEffect } from 'react'

// shape of your filter context
interface FilterContextType {
  selectedRegions: number[]
  setSelectedRegions: (regions: number[]) => void

  selectedPrice: { min: number; max: number }
  setSelectedPrice: (price: { min: number; max: number }) => void

  selectedArea: { min: number; max: number }
  setSelectedArea: (area: { min: number; max: number }) => void

  selectedBedrooms: number | null
  setSelectedBedrooms: (bedrooms: number | null) => void

  removeSelectedItem: (type: string, value: number | null) => void
}

// Default values for the context
const defaultValues: FilterContextType = {
  selectedRegions: [],
  setSelectedRegions: () => {},

  selectedPrice: { min: -Infinity, max: Infinity },
  setSelectedPrice: () => {},

  selectedArea: { min: 0, max: Infinity },
  setSelectedArea: () => {},

  selectedBedrooms: null,
  setSelectedBedrooms: () => {},

  removeSelectedItem: () => {},
}

export const FilterContext = createContext<FilterContextType>(defaultValues)

// FilterProvider component that holds the state
export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedRegions, setSelectedRegions] = useState<number[]>(() => {
    const storedRegions = localStorage.getItem('selectedRegions')
    return storedRegions ? JSON.parse(storedRegions) : []
  })

  //=======================Handling Special Values (e.g., Infinity)====================
  // Loading selectedPrice with Infinity handling
  const [selectedPrice, setSelectedPrice] = useState<{
    min: number
    max: number
  }>(() => {
    const storedPrice = localStorage.getItem('selectedPrice')
    if (storedPrice) {
      const parsedPrice = JSON.parse(storedPrice)
      return {
        min:
          parsedPrice.min === 'Infinity'
            ? Infinity
            : parsedPrice.min === '-Infinity'
              ? -Infinity
              : parsedPrice.min,
        max:
          parsedPrice.max === 'Infinity'
            ? Infinity
            : parsedPrice.max === '-Infinity'
              ? -Infinity
              : parsedPrice.max,
      }
    }
    return { min: -Infinity, max: Infinity }
  })

  //=======================Handling Special Values (e.g., Infinity)====================
  // Loading selectedArea with Infinity handling
  const [selectedArea, setSelectedArea] = useState<{
    min: number
    max: number
  }>(() => {
    const storedArea = localStorage.getItem('selectedArea')
    if (storedArea) {
      const parsedArea = JSON.parse(storedArea)
      return {
        min:
          parsedArea.min === 'Infinity'
            ? Infinity
            : parsedArea.min === '-Infinity'
              ? -Infinity
              : parsedArea.min,
        max:
          parsedArea.max === 'Infinity'
            ? Infinity
            : parsedArea.max === '-Infinity'
              ? -Infinity
              : parsedArea.max,
      }
    }
    return { min: -Infinity, max: Infinity }
  })

  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(
    () => {
      const storedBedrooms = localStorage.getItem('selectedBedrooms')
      return storedBedrooms ? JSON.parse(storedBedrooms) : null
    },
  )

  useEffect(() => {
    localStorage.setItem('selectedRegions', JSON.stringify(selectedRegions))
  }, [selectedRegions])

  //=======================Handling Special Values (e.g., Infinity)====================
  // Saving selectedPrice with Infinity handling
  useEffect(() => {
    const priceToStore = {
      min:
        selectedPrice.min === Infinity
          ? 'Infinity'
          : selectedPrice.min === -Infinity
            ? '-Infinity'
            : selectedPrice.min,
      max:
        selectedPrice.max === Infinity
          ? 'Infinity'
          : selectedPrice.max === -Infinity
            ? '-Infinity'
            : selectedPrice.max,
    }
    localStorage.setItem('selectedPrice', JSON.stringify(priceToStore))
  }, [selectedPrice])

  //=======================Handling Special Values (e.g., Infinity)====================
  // Saving selectedArea with Infinity handling
  useEffect(() => {
    const areaToStore = {
      min:
        selectedArea.min === Infinity
          ? 'Infinity'
          : selectedArea.min === -Infinity
            ? '-Infinity'
            : selectedArea.min,
      max:
        selectedArea.max === Infinity
          ? 'Infinity'
          : selectedArea.max === -Infinity
            ? '-Infinity'
            : selectedArea.max,
    }
    localStorage.setItem('selectedArea', JSON.stringify(areaToStore))
  }, [selectedArea])

  useEffect(() => {
    localStorage.setItem('selectedBedrooms', JSON.stringify(selectedBedrooms))
  }, [selectedBedrooms])

  const removeSelectedItem = (type: string, value: number | null) => {
    switch (type) {
      case 'removeFilters':
        setSelectedRegions([])
        setSelectedPrice({ min: -Infinity, max: Infinity })
        setSelectedArea({ min: -Infinity, max: Infinity })
        setSelectedBedrooms(null)
        break
      case 'region':
        setSelectedRegions(selectedRegions.filter(region => region !== value))
        break
      case 'price':
        setSelectedPrice({ min: -Infinity, max: Infinity })
        break
      case 'area':
        setSelectedArea({ min: -Infinity, max: Infinity })
        break
      case 'bedrooms':
        setSelectedBedrooms(null)
        break
      default:
        break
    }
  }

  return (
    <FilterContext.Provider
      value={{
        selectedRegions,
        setSelectedRegions,
        selectedPrice,
        setSelectedPrice,
        selectedArea,
        setSelectedArea,
        selectedBedrooms,
        setSelectedBedrooms,
        removeSelectedItem,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
