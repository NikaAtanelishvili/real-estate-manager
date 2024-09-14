import { HeaderLayout } from '@/layouts'
import {
  CreateAgentButton,
  CreateListingButton,
  Filter,
  ListingGrid,
} from './components'
import { FilterProvider } from '@/contexts'
import { useEffect } from 'react'
import { useFetchListings } from '@/hooks'

const Listing: React.FC = () => {
  const { listings, fetchListings } = useFetchListings()

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  return (
    <FilterProvider>
      <HeaderLayout>
        <div className="px-40">
          <section className="flex justify-between">
            <Filter />
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
