import { HeaderLayout } from '@/layouts'
import {
  CreateAgentButton,
  CreateListingButton,
  Filter,
  ListingGrid,
} from './components'
import { FilterProvider } from '@/contexts'
import { useEffect, useState } from 'react'
import { useFetchListings, useFetchRegions } from '@/hooks'

const Listing: React.FC = () => {
  const { listings, fetchListings } = useFetchListings()
  const { regions, fetchRegions } = useFetchRegions()
  const [bedrooms, setBedrooms] = useState<number[]>([])

  useEffect(() => {
    fetchListings()

    const bedrooms = listings.map(listing => listing.bedrooms)

    setBedrooms(bedrooms)
  }, [fetchListings, listings])

  useEffect(() => {
    fetchRegions()
  }, [fetchRegions])

  return (
    <FilterProvider>
      <HeaderLayout>
        <div className="my-16 flex flex-col gap-7 px-40">
          <section className="flex justify-between">
            <Filter regions={regions} bedrooms={bedrooms} />
            <div className="grid grid-cols-2 gap-4">
              <CreateListingButton />
              <CreateAgentButton />
            </div>
          </section>
          <section>
            <ListingGrid listings={listings || []} />
          </section>
        </div>
      </HeaderLayout>
    </FilterProvider>
  )
}

export default Listing
