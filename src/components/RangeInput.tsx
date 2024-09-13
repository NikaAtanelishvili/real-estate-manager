import { FormikValues } from 'formik'

interface RangeInputProps {
  id: string
  formik: FormikValues
  error: boolean
  rangeType: 'price' | 'area'
}

const RangeInput: React.FC<RangeInputProps> = props => {
  return (
    <div className="relative flex items-center">
      <input
        className={`max-w-40 rounded-md border border-[#808A93] p-3 text-sm leading-4 text-[#021526] outline-none ${
          props.error ? 'border-[#F93B1D]' : ''
        }`}
        type="number"
        name={props.id}
        placeholder="დან"
        min={0}
        id={props.id}
        {...props.formik.getFieldProps(props.id)}
      />
      <span className="absolute right-3 text-sm leading-3 text-[#2D3648]">
        {props.rangeType === 'area' && (
          <>
            მ<sup>2</sup>
          </>
        )}

        {props.rangeType === 'price' && '₾'}
      </span>
    </div>
  )
}

export default RangeInput
