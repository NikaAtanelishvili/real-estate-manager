import { CloseSvg, OpenSvg } from '@/assets'
import { useCallback, useEffect, useState } from 'react'

interface BedroomsType {
  isOpen: boolean
  toggleDropdown: () => void
  bedrooms: number[]
  onSelectionChange: (bedrooms: number[]) => void
  selectedBedrooms: number[]
}

const Bedrooms: React.FC<BedroomsType> = ({
  isOpen,
  toggleDropdown,
  bedrooms,
  onSelectionChange,
  selectedBedrooms: parentSelectedBedrooms,
}) => {
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([])

  // Sync local selectedBedrooms state with the parent-selectedBedrooms state (THIS IS HELL)
  useEffect(() => {
    setSelectedBedrooms(parentSelectedBedrooms)
  }, [parentSelectedBedrooms])

  const handleCheckboxChange = useCallback(
    (count: number) => {
      let updatedBedrooms
      if (selectedBedrooms.includes(count)) {
        updatedBedrooms = selectedBedrooms.filter(
          bedroomCount => bedroomCount !== count,
        )
      } else {
        updatedBedrooms = [...selectedBedrooms, count]
      }

      setSelectedBedrooms(updatedBedrooms)
      onSelectionChange(updatedBedrooms)
    },
    [onSelectionChange, selectedBedrooms],
  )

  const applySelection = () => {
    onSelectionChange(selectedBedrooms)
    toggleDropdown()
    console.log('არჩეული საძინებლების რაოდენობა:', selectedBedrooms)
  }

  return (
    <div>
      <button
        type="button"
        className={`flex min-w-max items-center gap-1 rounded-md px-4 py-2 ${
          isOpen ? 'bg-[#F3F3F3]' : 'bg-transparent'
        }`}
        onClick={toggleDropdown}
      >
        <span className="font-medium text-[#021526]">
          საძინებლების რაოდენობა
        </span>
        {isOpen ? <CloseSvg /> : <OpenSvg />}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-4 flex w-auto min-w-max flex-col gap-6 rounded-xl border border-[#DBDBDB] bg-white p-6 shadow-[5px_5px_12px_0px_#02152614]">
          <p className="w-full font-medium leading-5 text-[#021526]">
            საძინებლების რაოდენობა
          </p>
          <ul className="grid w-full grid-cols-4 gap-x-4 gap-y-4">
            {bedrooms.map(count => (
              <li key={count}>
                <div
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#808A93] bg-white text-xs text-[#021526B2] ${selectedBedrooms.includes(count) && 'border-[#F93B1D]'}`}
                  onClick={() => handleCheckboxChange(count)}
                >
                  <p>{count}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex w-full items-center justify-end">
            <button
              onClick={applySelection}
              className="rounded-lg bg-[#F93B1D] px-4 py-2 text-sm font-medium leading-4 text-white"
            >
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bedrooms
