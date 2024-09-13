import { createContext, useState, ReactNode } from 'react'

// shape of your filter context
interface FilterContextType {
  selectedRegions: number[]
  setSelectedRegions: (regions: number[]) => void

  selectedPrice: { min: number; max: number }
  setSelectedPrice: (price: { min: number; max: number }) => void

  selectedArea: { min: number; max: number }
  setSelectedArea: (area: { min: number; max: number }) => void

  selectedBedrooms: number[]
  setSelectedBedrooms: (bedrooms: number[]) => void

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

  selectedBedrooms: [],
  setSelectedBedrooms: () => {},

  removeSelectedItem: () => {},
}

export const FilterContext = createContext<FilterContextType>(defaultValues)

// FilterProvider component that holds the state
export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedRegions, setSelectedRegions] = useState<number[]>([])
  const [selectedPrice, setSelectedPrice] = useState<{
    min: number
    max: number
  }>({ min: -Infinity, max: Infinity })
  const [selectedArea, setSelectedArea] = useState<{
    min: number
    max: number
  }>({ min: -Infinity, max: Infinity })
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([])

  const removeSelectedItem = (type: string, value: number | null) => {
    switch (type) {
      case 'removeFilters':
        setSelectedRegions([])
        setSelectedPrice({ min: -Infinity, max: Infinity })
        setSelectedArea({ min: -Infinity, max: Infinity })
        setSelectedBedrooms([])
        break
      case 'region':
        setSelectedRegions(selectedRegions.filter(region => region !== value))
        break
      case 'price':
        setSelectedPrice({ min: 0, max: Infinity })
        break
      case 'area':
        setSelectedArea({ min: 0, max: Infinity })
        break
      case 'bedrooms':
        setSelectedBedrooms(
          selectedBedrooms.filter(bedroom => bedroom !== value),
        )
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
