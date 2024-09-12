import { Input } from '@/components'
import { HeaderLayout } from '@/layouts'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface CreateListing {
  is_rental: number
  address: string
  zip_code: number
  region: string
  city: string
  price: number
  area: number
  bedrooms: number
  description: string
}

const CreateListing: React.FC = () => {
  const validationSchema = Yup.object({
    is_rental: Yup.number().required(),
    address: Yup.string().min(2).required(),
    zip_code: Yup.number().required(),
    region: Yup.string().required(),
    city: Yup.string().required(),
    price: Yup.number().required(),
    area: Yup.number().required(),
    bedrooms: Yup.number().required(),
    description: Yup.string().min(5).required(),
  })

  const formik = useFormik({
    initialValues: {
      is_rental: '',
      address: '',
      zip_code: '',
      region: '',
      city: '',
      price: '',
      area: '',
      bedrooms: '',
      description: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <HeaderLayout>
      <div>
        <h1 className="text-4xl font-medium text-[#021526]">
          ლისტინგის დამატება
        </h1>
        <form onSubmit={formik.handleSubmit}>
          {/* DEAL TYPE */}
          {/* <div>
            <h2 className="font-Helvetica font-medium leading-5 text-[#1A1A1F]">
              გარიგების ტიპი
            </h2>
          </div> */}

          {/* LOCATION */}
          <div>
            <h2 className="font-Helvetica font-medium leading-5 text-[#1A1A1F]">
              მდებარეობა
            </h2>
            <div className="">
              <Input
                id={'address'}
                label={'მისამართი *'}
                formik={formik}
                type={'text'}
                errorText={'მინიმუმ ორი სიმბოლო'}
              />
              <Input
                id={'zip_code'}
                label={'საფოსტო ინდექსი *'}
                formik={formik}
                type={'number'}
                errorText={'მხოლოდ რიცხვები'}
              />
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h2 className="font-Helvetica font-medium leading-5 text-[#1A1A1F]">
              ბინის დეტალები
            </h2>

            <div
              className="grid grid-cols-2 gap-4"
              style={{
                gridTemplateColumns: '1fr 1fr',
                gridAutoFlow: 'row wrap',
              }}
            >
              <Input
                id={'price'}
                label={'ფასი *'}
                formik={formik}
                type={'number'}
                errorText={'მხოლოდ რიცხვები'}
              />
              <Input
                id={'area'}
                label={'ფართობი *'}
                formik={formik}
                type={'number'}
                errorText={'მხოლოდ რიცხვები'}
              />
              <Input
                id={'bedrooms'}
                label={'საძინებლების რაოდენობა *'}
                formik={formik}
                type={'number'}
                errorText={'მხოლოდ რიცხვები'}
              />
            </div>
          </div>

          {/* AGENT */}
          {/* <div>
            <h2 className="font-Helvetica font-medium leading-5 text-[#1A1A1F]">
              აგენტი
            </h2>
          </div> */}
        </form>
      </div>
    </HeaderLayout>
  )
}

export default CreateListing
