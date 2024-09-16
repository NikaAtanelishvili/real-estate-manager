import { useFormik } from 'formik'
import ReactDOM from 'react-dom'
import Input from './Input'
import * as Yup from 'yup'
import Button from './Button'
import FileInput from './FileInput'

interface CreateAgent {
  name: string
  surname: string
  email: string
  phone: string
  avatar: string
}

const base64ToFile = (base64String: string, fileName: string): File => {
  const [prefix, base64Data] = base64String.split(',')

  if (!prefix || !base64Data) {
    throw new Error('Invalid base64 string format.')
  }

  const byteString = atob(base64Data)
  const byteNumbers = new Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)

  const mimeTypeMatch = prefix.match(/:(.*?);/)
  if (!mimeTypeMatch) {
    throw new Error('Unable to determine MIME type.')
  }
  const mimeType = mimeTypeMatch[1]

  const blob = new Blob([byteArray], { type: mimeType })

  return new File([blob], fileName, { type: mimeType })
}

const createFormData = (values: CreateAgent) => {
  const formData = new FormData()

  formData.append('name', values.name)
  formData.append('surname', values.surname)
  formData.append('email', values.email)
  formData.append('phone', values.phone)

  try {
    const file = base64ToFile(values.avatar, 'avatar.jpg') // Ensure file name here is appropriate
    formData.append('avatar', file)
  } catch (error) {
    console.error('Error converting base64 to file:', error)
  }

  return formData
}

const validationSchema = Yup.object({
  name: Yup.string().required().min(2),
  surname: Yup.string().required().min(2),
  email: Yup.string()
    .required()
    .matches(/@redberry\.ge$/),
  avatar: Yup.string().required(),
  phone: Yup.string()
    .required()
    .matches(/^5\d{8}$/),
})

const CreateAgentModal: React.FC<{
  closeModal: () => void
}> = props => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      avatar: '',
      phone: '',
    } as CreateAgent,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = createFormData(values)

        const response = await fetch(
          `https://api.real-estate-manager.redberryinternship.ge/api/agents`,
          {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer 9d05d85b-41d1-4d0d-9779-85c35560821f`,
            },
          },
        )

        switch (response.status) {
          case 201: {
            const data = await response.json()
            console.log(data)
            props.closeModal()
            break
          }

          case 401: {
            const error = await response.json()
            throw new Error(error.message || 'Please provide valid API token')
          }

          case 422: {
            const error = await response.json()
            throw new Error(error.message || 'Validation error')
          }

          case 500: {
            const error = await response.json()
            throw new Error(error.message || 'Network response is unavailable')
          }

          default: {
            const error = await response.json()
            throw new Error(
              error.message || `Unexpected status code: ${response.status}`,
            )
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  console.log(formik)

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={props.closeModal}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="flex w-full max-w-4xl flex-col gap-16 rounded-xl bg-white px-28 py-20"
      >
        <h1 className="text-center text-4xl font-medium text-[#021526]">
          აგენტის დამატება
        </h1>
        <form
          id="agent"
          onSubmit={formik.handleSubmit}
          className="flex w-full flex-col gap-20"
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-7">
            <Input
              id={'name'}
              label={'სახელი'}
              formik={formik}
              type={'text'}
              errorText={'მინიმუმ ორი სიმბოლო'}
            />
            <Input
              id={'surname'}
              label={'გვარი'}
              formik={formik}
              type={'text'}
              errorText={'მინიმუმ ორი სიმბოლო'}
            />
            <Input
              id={'email'}
              label={'ელ-ფოსტა'}
              formik={formik}
              type={'text'}
              errorText={'გამოიყენეთ @redberry.ge ფოსტა'}
            />
            <Input
              id={'phone'}
              label={'ტელეფონის ნომერი'}
              formik={formik}
              type={'number'}
              errorText={'მინიმუმ რიცხვები'}
            />
            <div className="col-span-2">
              <FileInput
                id={'avatar'}
                label={'ატვირთეთ ფოტო'}
                formik={formik}
              />
            </div>
          </div>

          {/* SUBMIT AND CANCEL BUTTONS */}
          <div className="flex justify-end gap-4">
            <Button
              form={'agent'}
              type={'button'}
              onClick={props.closeModal}
              backgroundColor={'#FFF'}
              textColor={'#F93B1D'}
              text={'გაუქმება'}
            />
            <Button
              form={'agent'}
              type={'submit'}
              backgroundColor={'#F93B1D'}
              textColor={'#FFF'}
              text={formik.isSubmitting ? 'დაელოდეთ...' : ' დაამატე აგენტი'}
            />
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('create-agent-modal-root') as HTMLElement,
  )
}

export default CreateAgentModal
