import { XSvg } from '@/assets'
import { ReactNode } from 'react'

const selectedItem: React.FC<{
  label: ReactNode
  onRemove: () => void
}> = ({ label, onRemove }) => {
  return (
    <div className="flex items-center justify-center gap-1 rounded-3xl border border-[#DBDBDB] px-[10px] py-[6px] text-sm leading-4 text-[#021526CC]">
      <span>{label}</span>
      <button onClick={onRemove}>
        <XSvg />
      </button>
    </div>
  )
}

export default selectedItem
