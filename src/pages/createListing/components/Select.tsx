import { OpenSvg } from '@/assets'
import { AgentType, CityType, RegionType } from '@/types'
import { FormikValues } from 'formik'
import { useState } from 'react'

interface SelectProps {
  id: string
  label: string
  formik: FormikValues
  options: AgentType[] | CityType[] | RegionType[]
}

const Select: React.FC<SelectProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleOptionSelect = (option: AgentType | CityType | RegionType) => {
    props.formik.setFieldValue(props.id, option)
    setIsOpen(!isOpen)
  }

  const renderSelectedOption = () => {
    const selectedOption = props.formik.values[props.id]

    if (selectedOption?.surname) {
      return `${selectedOption.name} ${selectedOption.surname}`
    }

    if (selectedOption?.name) {
      return selectedOption.name
    }

    return 'აირჩიეთ'
  }

  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm font-medium leading-4 text-[#021526]"
        htmlFor={props.id}
      >
        {props.label}
      </label>

      <div className="relative">
        <div
          onClick={handleToggle}
          className={`flex h-11 w-full items-center justify-between rounded-md border border-[#808A93] px-2 leading-5 text-[#021526] ${props.formik.errors[props.id] && props.formik.touched[props.id] && 'border-[#F93B1D]'} ${isOpen && 'rounded-b-none border-b-0'}`}
        >
          <p>{renderSelectedOption()}</p>
          <OpenSvg />
        </div>
        {isOpen && (
          <div className="absolute flex w-full flex-col rounded-b-md border border-t-0 border-[#808A93] bg-white">
            {props.options.map(option => (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className="cursor-pointer border-t border-[#808A93] px-4 py-2 hover:bg-gray-200"
              >
                {option.name} {'surname' in option && option.surname}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Select
