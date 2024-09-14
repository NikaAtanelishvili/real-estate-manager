import { useContext, useState } from 'react'
import Region from './Region'
import Price from './Price'
import Area from './Area'
import Bedrooms from './Bedrooms'
import { SelectedItem } from '@/components'
import { FilterContext } from '@/contexts'
import { RegionType } from '@/types'

const Filter: React.FC<{
  regions: RegionType[]
  bedrooms: number[]
}> = props => {
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

  const selectedRegionsDisplay = props.regions.filter(region =>
    selectedRegions.includes(region.id),
  )

  return (
    <div className="inline-flex flex-col gap-4">
      <div className="relative inline-flex gap-x-6 rounded-xl border border-[#DBDBDB] p-1">
        <Region
          regions={props.regions}
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
          bedrooms={props.bedrooms}
          onSelectionChange={setSelectedBedrooms}
          selectedBedrooms={selectedBedrooms}
        />
      </div>

      {/* Display Selected Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Display selected regions */}
        {selectedRegionsDisplay.map(region => (
          <SelectedItem
            key={region.id}
            label={region.name}
            onRemove={() => removeSelectedItem('region', region.id)}
          />
        ))}

        {/* Display selected price */}
        {(selectedPrice.min !== -Infinity ||
          selectedPrice.max !== Infinity) && (
          <SelectedItem
            label={`${selectedPrice.min === -Infinity ? '0' : selectedPrice.min} ₾ - ${selectedPrice.max === Infinity ? '∞' : selectedPrice.max} ₾`}
            onRemove={() => removeSelectedItem('price', null)}
          />
        )}

        {/* Display selected area */}
        {(selectedArea.min !== -Infinity || selectedArea.max !== Infinity) && (
          <SelectedItem
            label={
              <>
                {`${selectedArea.min === -Infinity ? '0' : selectedArea.min} მ`}
                <sup>2</sup>
                {` - ${selectedArea.max === Infinity ? '∞' : selectedArea.max} მ`}
                <sup>2</sup>
              </>
            }
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

        {(selectedRegions.length > 0 ||
          selectedPrice.min !== -Infinity ||
          selectedPrice.max !== Infinity ||
          selectedArea.min !== -Infinity ||
          selectedArea.max !== Infinity ||
          selectedBedrooms.length > 0) && (
          <div
            className="cursor-pointer"
            onClick={() => removeSelectedItem('removeFilters', null)}
          >
            <p className="font-FiraGO text-sm font-medium leading-4 text-[#021526]">
              გასუფთავება
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Filter
