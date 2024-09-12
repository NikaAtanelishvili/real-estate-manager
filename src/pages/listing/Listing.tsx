import { HeaderLayout } from '@/layouts'
import { Filter, ListingGrid } from './components'
import dummyListing from './dummyListing'

const Listing: React.FC = () => {
  return (
    <HeaderLayout>
      <div className="px-40">
        <section>
          <Filter />
        </section>
        <section>
          <ListingGrid listrings={dummyListing} />
        </section>
      </div>
    </HeaderLayout>
  )
}

export default Listing
