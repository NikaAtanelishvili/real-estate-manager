import { Card } from '@/components'
import { CardProps } from '@/types'

const ListingGrid: React.FC<{ listrings: CardProps[] }> = props => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {props.listrings.map(listing => (
        <Card {...listing} />
      ))}
    </div>
  )
}

export default ListingGrid
