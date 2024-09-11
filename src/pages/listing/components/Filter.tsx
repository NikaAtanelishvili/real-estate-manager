import { useState } from 'react'
import Region from './Region'
import Price from './Price'
import Area from './Area'
import Bedrooms from './Bedrooms'

const dummyRegions = [
  { id: 1, name: 'New York' },
  { id: 2, name: 'Los Angeles' },
  { id: 3, name: 'Chicago' },
  { id: 4, name: 'Houston' },
  { id: 5, name: 'Phoenix' },
  { id: 6, name: 'Philadelphia' },
  { id: 7, name: 'San Antonio' },
  { id: 8, name: 'San Diego' },
  { id: 9, name: 'Dallas' },
  { id: 10, name: 'San Jose' },
  { id: 11, name: 'Austin' },
  { id: 12, name: 'Jacksonville' },
  { id: 13, name: 'Fort Worth' },
  { id: 14, name: 'Columbus' },
  { id: 15, name: 'Charlotte' },
]

const dummyBedrooms = [1, 2, 3, 4]

const Filter: React.FC = () => {
  // ONLY ONE DROPDOWN IS OPEN AT A TIME
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(prev => (prev === dropdown ? null : dropdown))
  }

  return (
    <div className="relative inline-flex gap-x-6 rounded-xl border border-[#DBDBDB] p-1">
      <Region
        regions={dummyRegions}
        isOpen={openDropdown === 'region'}
        toggleDropdown={() => toggleDropdown('region')}
      />
      <Price
        isOpen={openDropdown === 'price'}
        toggleDropdown={() => toggleDropdown('price')}
      />
      <Area
        isOpen={openDropdown === 'area'}
        toggleDropdown={() => toggleDropdown('area')}
      />
      <Bedrooms
        isOpen={openDropdown === 'bedrooms'}
        toggleDropdown={() => toggleDropdown('bedrooms')}
        bedrooms={dummyBedrooms}
      />
    </div>
  )
}

export default Filter
