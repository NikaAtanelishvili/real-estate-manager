import { PlusSvg } from '@/assets'
import { useState } from 'react'

interface ButtonProps {
  type: 'submit' | 'button'
  backgroundColor: string
  text: string
  textColor: string
  form?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = props => {
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const getHoverBackgroundColor = () => {
    if (props.backgroundColor === '#FFF') {
      return '#F93B1D'
    } else if (props.backgroundColor === '#F93B1D') {
      return '#DF3014'
    }
    return props.backgroundColor // Default to the original color if not #FFF or #F93B1D
  }

  const getHoverTextColor = () => {
    if (props.textColor === '#F93B1D') {
      return '#FFF'
    }
    return props.textColor // Keep the original color if it's already #FFF
  }

  return (
    <button
      form={props.form}
      onClick={props.onClick}
      type={props.type}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: hovered
          ? getHoverBackgroundColor()
          : props.backgroundColor,
        transition: 'background-color 0.2s ease-in-out',
      }}
      className="flex h-[50px] items-center justify-center gap-2 rounded-lg border border-[#F93B1D] px-4"
    >
      <PlusSvg color={hovered ? getHoverTextColor() : props.textColor} />
      <p
        style={{ color: hovered ? getHoverTextColor() : props.textColor }}
        className="font-medium leading-5"
      >
        {props.text}
      </p>
    </button>
  )
}

export default Button
