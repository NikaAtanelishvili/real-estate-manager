import { PlusSvg } from '@/assets'

interface ButtonProps {
  type: 'submit' | 'button'
  backgroundColor: string
  text: string
  textColor: string
  form: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <button
      form={props.form}
      onClick={props.onClick}
      type={props.type}
      style={{ backgroundColor: props.backgroundColor }}
      className={`flex h-[50px] items-center justify-center gap-2 rounded-lg border border-[#F93B1D] px-4`}
    >
      <PlusSvg color={props.textColor} />
      <p style={{ color: props.textColor }} className={`font-medium leading-5`}>
        {props.text}
      </p>
    </button>
  )
}

export default Button
