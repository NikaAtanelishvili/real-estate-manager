import { FormikValues } from 'formik'

interface InputProps {
  id: string
  label: string
  formik: FormikValues
  type: string
  errorText: string
}

const Input: React.FC<InputProps> = props => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        {...props.formik.getFieldProps(props.id)}
      />
      <div>{props.errorText}</div>
    </div>
  )
}

export default Input
