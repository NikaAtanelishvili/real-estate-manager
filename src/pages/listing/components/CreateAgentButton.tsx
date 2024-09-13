import { PlusSvg } from '@/assets'
import { CreateAgentModal } from '@/components'
import { useState } from 'react'

const CreateListingButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <button
        type="button"
        className="flex h-[50px] items-center justify-center gap-2 rounded-lg border border-[#F93B1D] px-4"
        onClick={openModal}
      >
        <PlusSvg color={'#F93B1D'} />
        <p className="font-medium leading-5 text-[#F93B1D]">
          ლისტინგის დამატება
        </p>
      </button>
      {isModalOpen && <CreateAgentModal closeModal={closeModal} />}
    </div>
  )
}

export default CreateListingButton
