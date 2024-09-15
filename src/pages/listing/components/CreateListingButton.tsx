import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'

const CreateListingButton: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Button
      type={'button'}
      backgroundColor={'#F93B1D'}
      text={'ლისტინგის დამატება'}
      textColor={'#FFF'}
      onClick={() => navigate('/create-listing')}
    />
  )
}

export default CreateListingButton
