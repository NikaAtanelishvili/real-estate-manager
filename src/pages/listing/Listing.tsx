import { HeaderLayout } from '@/layouts'
import { CreateListingButton, Filter, ListingGrid } from './components'
import dummyListing from './dummyListing'
import { FilterProvider } from '@/contexts'

const Listing: React.FC = () => {
  return (
    <FilterProvider>
      <HeaderLayout>
        <div className="px-40">
          <section className="flex justify-between">
            <Filter />
            <div>
              <CreateListingButton />
            </div>
          </section>
          <section>
            <ListingGrid listrings={dummyListing} />
          </section>
        </div>
      </HeaderLayout>
    </FilterProvider>
  )
}

export default Listing
