import { PlusSvg } from '@/assets'
import { useNavigate } from 'react-router-dom'

const CreateListingButton: React.FC = () => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/create-listing')}
      className="flex h-[50px] items-center justify-center gap-2 rounded-lg bg-[#F93B1D] px-4"
    >
      <PlusSvg color={'#FFF'} />
      <p className="font-medium leading-5 text-white">ლისტინგის დამატება</p>
    </button>
  )
}

export default CreateListingButton
