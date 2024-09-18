import { Card } from '@/components'
import { FilterContext } from '@/contexts'
import { CardProps } from '@/types'
import { useContext } from 'react'

const ListingGrid: React.FC<{ listings: CardProps[] | [] }> = props => {
  const { selectedRegions, selectedPrice, selectedArea, selectedBedrooms } =
    useContext(FilterContext)

  const filteredListings = props.listings.filter(listing => {
    let matchesAtLeastOne = false
    let hasActiveFilter = false

    const DEFAULT_RANGE_VALUES = { min: -Infinity, max: Infinity }

    if (selectedRegions.length > 0) {
      hasActiveFilter = true
      if (selectedRegions.includes(listing.city.region_id)) {
        matchesAtLeastOne = true
      }
    }

    if (
      selectedPrice.min !== DEFAULT_RANGE_VALUES.min ||
      selectedPrice.max !== DEFAULT_RANGE_VALUES.max
    ) {
      hasActiveFilter = true
      if (
        listing.price >= selectedPrice.min &&
        listing.price <= selectedPrice.max
      ) {
        matchesAtLeastOne = true
      }
    }

    if (
      selectedArea.min !== DEFAULT_RANGE_VALUES.min ||
      selectedArea.max !== DEFAULT_RANGE_VALUES.max
    ) {
      hasActiveFilter = true
      if (
        listing.area >= selectedArea.min &&
        listing.area <= selectedArea.max
      ) {
        matchesAtLeastOne = true
      }
    }

    if (selectedBedrooms !== null) {
      hasActiveFilter = true
      if (listing.bedrooms === selectedBedrooms) {
        matchesAtLeastOne = true
      }
    }

    // If no filters are active, include all listings
    if (!hasActiveFilter) {
      return true
    }

    // Include listing if it matches at least one active filter
    return matchesAtLeastOne
  })

  return (
    <div>
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {filteredListings.map(listing => (
            <Card key={listing.id} {...listing} />
          ))}
        </div>
      ) : (
        <h1 className="text-xl leading-6 text-[#021526CC]">
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </h1>
      )}
    </div>
  )
}

export default ListingGrid
