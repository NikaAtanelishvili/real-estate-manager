import { HeaderLayout } from '@/layouts'
import {
  CreateAgentButton,
  CreateListingButton,
  Filter,
  ListingGrid,
} from './components'
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
              <CreateAgentButton />
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
