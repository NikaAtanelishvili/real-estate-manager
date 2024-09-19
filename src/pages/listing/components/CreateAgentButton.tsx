import { Button, CreateAgentModal } from '@/components'
import { useState } from 'react'

const CreateListingButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Button
        type={'button'}
        backgroundColor={'#FFF'}
        text={'აგენტის დამატება'}
        textColor={'#F93B1D'}
        onClick={openModal}
      />
      {isModalOpen && <CreateAgentModal closeModal={closeModal} />}
    </>
  )
}

export default CreateListingButton
