import { TickSvg } from '@/assets'
import { FormikValues } from 'formik'
import React from 'react'

interface InputProps {
  id: string
  label?: string
  formik: FormikValues
  type: string
  errorText?: string
}

const Input: React.FC<InputProps> = React.memo(
  props => {
    let color = '#021526'

    // ERROR (RED)
    if (props.formik.touched[props.id] && props.formik.errors[props.id]) {
      color = '#F93B1D'
    }

    // SUCCESS (GREEN)
    if (props.formik.touched[props.id] && !props.formik.errors[props.id]) {
      color = '#45A849'
    }

    if (props.formik.values[props.id]) {
      props.formik.setFieldTouched(props.id, true)
    }

    return (
      <div className="flex flex-col gap-1">
        {props.label && (
          <label
            className="text-sm font-medium leading-4 text-[#021526]"
            htmlFor={props.id}
          >
            {props.label}
          </label>
        )}

        <input
          // ${!props.label && 'px-0 text-center'} FOR BEDROOMS FILTER
          className={`h-11 w-full rounded-md border border-[#808A93] px-2 ${!props.label && 'px-0 text-center'} leading-5 text-[#021526] outline-none ${props.formik.errors[props.id] && props.formik.touched[props.id] && 'border-[#F93B1D]'}`}
          type={props.type}
          id={props.id}
          {...props.formik.getFieldProps(props.id)}
          onFocus={() => props.formik.setFieldTouched(props.id, true)}
        />

        {props.errorText && (
          <div className="flex items-center gap-1">
            <TickSvg color={color} />
            <p style={{ color: color }} className={`text-sm leading-4`}>
              {props.errorText}
            </p>
          </div>
        )}
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Perform a custom comparison to determine if re-render is necessary
    return (
      prevProps.id === nextProps.id &&
      prevProps.formik.values[prevProps.id] ===
        nextProps.formik.values[nextProps.id] &&
      prevProps.formik.errors[prevProps.id] ===
        nextProps.formik.errors[prevProps.id] &&
      prevProps.formik.touched[prevProps.id] ===
        nextProps.formik.touched[prevProps.id]
    )
  },
)

export default Input
