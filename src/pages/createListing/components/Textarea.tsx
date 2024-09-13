import { TickSvg } from '@/assets'
import { FormikValues } from 'formik'

interface TextareaProps {
  id: string
  label: string
  formik: FormikValues
  errorText: string
}

const Textarea: React.FC<TextareaProps> = props => {
  let color = '#021526'

  // ERROR (RED)
  if (props.formik.touched[props.id] && props.formik.errors[props.id]) {
    color = '#F93B1D'
  }

  // SUCCESS (GREEN)
  if (props.formik.touched[props.id] && !props.formik.errors[props.id]) {
    color = '#45A849'
  }

  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm font-medium leading-4 text-[#021526]"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <textarea
        rows={5}
        style={{ resize: 'none' }}
        className={`w-full rounded-md border border-[#808A93] p-2 leading-5 text-[#021526] outline-none ${props.formik.errors[props.id] && props.formik.touched[props.id] && 'border-[#F93B1D]'}`}
        id={props.id}
        {...props.formik.getFieldProps(props.id)}
      />

      <div className="flex items-center gap-1">
        <TickSvg color={color} />
        <p style={{ color: color }} className={`text-sm leading-4`}>
          {props.errorText}
        </p>
      </div>
    </div>
  )
}

export default Textarea
