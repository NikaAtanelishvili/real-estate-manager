import { XSvg } from '@/assets'
import { Button } from '@/components'
import ReactDOM from 'react-dom'

const DeleteListingModal: React.FC<{
  closeModal: () => void
  deleteListing: () => void
  loading: boolean
}> = props => {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={props.closeModal}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="flex w-full max-w-2xl flex-col gap-16 rounded-xl bg-white shadow-[5px_5px-12px_0px_#02152614]"
      >
        <div className="relative flex w-full flex-col items-center gap-3">
          <div className="absolute flex w-full justify-end p-4">
            <div
              className="scale-[2] cursor-pointer"
              onClick={props.closeModal}
            >
              <XSvg />
            </div>
          </div>
          <div className="my-14 flex flex-col gap-9">
            <h1 className="text-xl leading-6 text-[#2D3648]">
              გსურთ წაშალოთ ლისტინგი?
            </h1>

            <div className="flex gap-3">
              <Button
                type={'button'}
                backgroundColor={'#FFF'}
                text={'გაუქმება'}
                textColor={'#F93B1D'}
                onClick={props.closeModal}
              />
              <Button
                type={'button'}
                backgroundColor={'#F93B1D'}
                text={props.loading ? 'დაელოდეთ...' : 'დადასტურება'}
                textColor={'#FFF'}
                onClick={props.deleteListing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('delete-listing-modal-root') as HTMLElement,
  )
}

export default DeleteListingModal
