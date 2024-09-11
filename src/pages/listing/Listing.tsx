import { HeaderLayout } from '@/layouts'
import { Filter } from './components'

const Listing: React.FC = () => {
  return (
    <HeaderLayout>
      <section>
        <Filter />
      </section>
    </HeaderLayout>
  )
}

export default Listing
