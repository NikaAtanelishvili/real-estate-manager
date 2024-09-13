interface RadioButtonProps {
  label: string
  name: string
  value: number
  checked: boolean
  onChange: () => void
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="flex max-w-32 items-center gap-2 text-sm leading-4 text-[#021526]">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  )
}

export default RadioButton
