import { Card } from '@/components'
import { FilterContext } from '@/contexts'
import { CardProps } from '@/types'
import { useContext } from 'react'

const ListingGrid: React.FC<{ listings: CardProps[] | [] }> = props => {
  const { selectedRegions, selectedPrice, selectedArea, selectedBedrooms } =
    useContext(FilterContext)

  const filteredListings = props.listings.filter(listing => {
    if (
      selectedRegions.length > 0 &&
      !selectedRegions.includes(listing.city.region_id)
    ) {
      return false
    }

    if (
      listing.price < selectedPrice.min ||
      listing.price > selectedPrice.max
    ) {
      return false
    }

    if (listing.area < selectedArea.min || listing.area > selectedArea.max) {
      return false
    }

    if (
      selectedBedrooms.length > 0 &&
      !selectedBedrooms.includes(listing.bedrooms)
    ) {
      return false
    }

    return true
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
