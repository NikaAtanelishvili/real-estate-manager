import { CloseSvg, OpenSvg } from '@/assets'
import { useCallback, useEffect, useState } from 'react'

interface RegionType {
  regions: { id: number; name: string }[]
  isOpen: boolean
  toggleDropdown: () => void
  onSelectionChange: (selectedRegions: number[]) => void
  selectedRegions: number[]
}

const Region: React.FC<RegionType> = ({
  regions,
  isOpen,
  toggleDropdown,
  onSelectionChange,
  selectedRegions: parentSelectedRegions,
}) => {
  const [selectedRegions, setSelectedRegions] = useState<number[]>([])

  // Sync local selectedRegions state with the parent-selectedRegions state (THIS IS HELL)
  useEffect(() => {
    setSelectedRegions(parentSelectedRegions)
  }, [parentSelectedRegions])

  const handleCheckboxChange = useCallback(
    (id: number) => {
      let updatedRegions
      if (selectedRegions.includes(id)) {
        updatedRegions = selectedRegions.filter(regionId => regionId !== id)
      } else {
        updatedRegions = [...selectedRegions, id]
      }
      setSelectedRegions(updatedRegions) // Update the local state
    },
    [selectedRegions],
  )

  const applySelection = () => {
    toggleDropdown() // Close dropdown after applying
    onSelectionChange(selectedRegions)
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
        <>
          {/* TRANSPARENT BACKGROUND! WHEN USER CLICKS OUTSIDE OF DROPDOWN IT CLOSES */}
          <div
            className="fixed inset-0 -z-10 bg-transparent"
            onClick={toggleDropdown}
          ></div>
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
                className="rounded-lg bg-[#F93B1D] px-4 py-2 text-sm font-medium leading-4 text-white hover:bg-[#DF3014]"
                style={{
                  transition: 'background-color 0.2s ease-in-out',
                }}
              >
                არჩევა
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Region
