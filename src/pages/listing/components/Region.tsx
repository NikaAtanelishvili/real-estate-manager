import { CloseSvg, OpenSvg } from '@/assets'
import { useCallback, useState } from 'react'

interface RegionType {
  regions: { id: number; name: string }[]
  isOpen: boolean
  toggleDropdown: () => void
}

const Region: React.FC<RegionType> = ({ regions, isOpen, toggleDropdown }) => {
  const [selectedRegions, setSelectedRegions] = useState<number[]>([])

  const handleCheckboxChange = useCallback(
    (id: number) => {
      if (selectedRegions.includes(id)) {
        setSelectedRegions(selectedRegions.filter(regionId => regionId !== id))
      } else {
        setSelectedRegions([...selectedRegions, id])
      }
    },
    [selectedRegions],
  )

  const applySelection = () => {
    toggleDropdown() // Close dropdown after applying
    // WORK IN PROGRESS (HANDLING FILTER)
    console.log('არჩეული რეგიონების ID:', selectedRegions)
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
        <span className="font-medium text-[#021526]">რეგიონი</span>
        {isOpen ? <CloseSvg /> : <OpenSvg />}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-4 flex w-auto min-w-max flex-col gap-6 rounded-xl border border-[#DBDBDB] bg-white p-6 shadow-[5px_5px_12px_0px_#02152614]">
          <p className="w-full font-medium leading-5 text-[#021526]">
            რეგიონის მიხედვით
          </p>
          <ul className="grid w-full grid-cols-3 gap-x-12 gap-y-4">
            {regions.map(region => (
              <li key={region.id} className="min-w-48">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="custom-checkbox form-checkbox h-5 w-5"
                    checked={selectedRegions.includes(region.id)}
                    onChange={() => handleCheckboxChange(region.id)}
                  />
                  <p className="text-sm leading-4 text-[#021526]">
                    {region.name}
                  </p>
                </label>
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

export default Region
