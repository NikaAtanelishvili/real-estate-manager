import { useContext, useState } from 'react'
import Region from './Region'
import Price from './Price'
import Area from './Area'
import Bedrooms from './Bedrooms'
import { SelectedItem } from '@/components'
import { FilterContext } from '@/contexts'

const dummyRegions = [
  { id: 1, name: 'New York' },
  { id: 2, name: 'Los Angeles' },
  { id: 3, name: 'Chicago' },
  { id: 4, name: 'Houston' },
  { id: 5, name: 'Phoenix' },
  { id: 6, name: 'Philadelphia' },
  { id: 7, name: 'San Antonio' },
  { id: 8, name: 'San Diego' },
  { id: 9, name: 'Dallas' },
  { id: 10, name: 'San Jose' },
  { id: 11, name: 'Austin' },
  { id: 12, name: 'Jacksonville' },
  { id: 13, name: 'Fort Worth' },
  { id: 14, name: 'Columbus' },
  { id: 15, name: 'Charlotte' },
]

const dummyBedrooms = [1, 2, 3, 4]

const Filter: React.FC = () => {
  const {
    selectedRegions,
    setSelectedRegions,
    selectedPrice,
    setSelectedPrice,
    selectedArea,
    setSelectedArea,
    selectedBedrooms,
    setSelectedBedrooms,
    removeSelectedItem,
  } = useContext(FilterContext)

  // ONLY ONE DROPDOWN IS OPEN AT A TIME
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(prev => (prev === dropdown ? null : dropdown))
  }

  /*
  // State to track selected filters
  const [selectedRegions, setSelectedRegions] = useState<number[]>([])
  const [selectedPrice, setSelectedPrice] = useState<{
    min: number
    max: number
  }>({ min: 0, max: Infinity })
  const [selectedArea, setSelectedArea] = useState<{
    min: number
    max: number
  }>({ min: 0, max: Infinity })
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([])

  const handleRegionSelection = useCallback((regions: number[]) => {
    setSelectedRegions(regions)
  }, [])

  const handlePriceSelection = useCallback((min: number, max: number) => {
    setSelectedPrice({ min, max })
  }, [])

  const handleAreaSelection = useCallback((min: number, max: number) => {
    setSelectedArea({ min, max })
  }, [])

  const handleBedroomsSelection = useCallback((bedrooms: number[]) => {
    setSelectedBedrooms(bedrooms)
  }, [])

  const removeSelectedItem = (type: string, value: number | null) => {
    switch (type) {
      case 'removeFilters':
        setSelectedRegions([])
        setSelectedPrice({ min: 0, max: Infinity })
        setSelectedArea({ min: 0, max: Infinity })
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
 */
  return (
    <div className="inline-flex flex-col gap-4">
      <div className="relative inline-flex gap-x-6 rounded-xl border border-[#DBDBDB] p-1">
        <Region
          regions={dummyRegions}
          isOpen={openDropdown === 'region'}
          toggleDropdown={() => toggleDropdown('region')}
          onSelectionChange={setSelectedRegions}
          selectedRegions={selectedRegions}
        />
        <Price
          isOpen={openDropdown === 'price'}
          toggleDropdown={() => toggleDropdown('price')}
          onSelectionChange={(min, max) => setSelectedPrice({ min, max })}
          selectedPrice={selectedPrice}
        />
        <Area
          isOpen={openDropdown === 'area'}
          toggleDropdown={() => toggleDropdown('area')}
          onSelectionChange={(min, max) => setSelectedArea({ min, max })}
          selectedArea={selectedArea}
        />
        <Bedrooms
          isOpen={openDropdown === 'bedrooms'}
          toggleDropdown={() => toggleDropdown('bedrooms')}
          bedrooms={dummyBedrooms}
          onSelectionChange={setSelectedBedrooms}
          selectedBedrooms={selectedBedrooms}
        />
      </div>

      {/* Display Selected Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Display selected regions */}
        {selectedRegions.map(region => (
          <SelectedItem
            key={region}
            label={region}
            onRemove={() => removeSelectedItem('region', region)}
          />
        ))}

        {/* Display selected price */}
        {selectedPrice.min !== 0 && selectedPrice.max !== Infinity && (
          <SelectedItem
            label={`${selectedPrice.min} ₾ - ${selectedPrice.max} ₾`}
            onRemove={() => removeSelectedItem('price', null)}
          />
        )}

        {/* Display selected area */}
        {selectedArea.min !== 0 && selectedArea.max !== Infinity && (
          <SelectedItem
            label={`${selectedArea.min} მ - ${selectedArea.max} მ`}
            onRemove={() => removeSelectedItem('area', null)}
          />
        )}

        {/* Display selected bedrooms */}
        {selectedBedrooms.map(bedroom => (
          <SelectedItem
            key={bedroom}
            label={bedroom}
            onRemove={() => removeSelectedItem('bedrooms', bedroom)}
          />
        ))}
        <div
          className="cursor-pointer"
          onClick={() => removeSelectedItem('removeFilters', null)}
        >
          <p className="text-sm font-medium leading-4 text-[#021526]">
            გასუფთავება
          </p>
        </div>
      </div>
    </div>
  )
}

export default Filter
