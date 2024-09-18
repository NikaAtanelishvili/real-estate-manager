import { Button, CreateAgentModal, FileInput, Input } from '@/components'
import { HeaderLayout } from '@/layouts'
import { AgentType, CityType, RegionType } from '@/types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RadioButton, Select, Textarea } from './components'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetchAgents, useFetchCities, useFetchRegions } from '@/hooks'

interface CreateListing {
  is_rental: number
  address: string
  zip_code: string
  region: RegionType
  city: CityType
  price: string
  area: string
  bedrooms: string
  description: string
  image: string
  agent: AgentType
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

const createFormData = (values: CreateListing) => {
  const formData = new FormData()

  formData.append('is_rental', values.is_rental.toString())
  formData.append('address', values.address)
  formData.append('zip_code', values.zip_code)
  formData.append('price', values.price)
  formData.append('area', values.area)
  formData.append('bedrooms', values.bedrooms)
  formData.append('description', values.description)
  formData.append('region_id', values.region.id.toString())
  formData.append('city_id', values.city.id.toString())
  formData.append('agent_id', values.agent.id.toString())

  try {
    const file = base64ToFile(values.image, 'image.jpg') // Ensure file name here is appropriate
    formData.append('image', file)
  } catch (error) {
    console.error('Error converting base64 to file:', error)
  }

  return formData
}

const validationSchema = Yup.object({
  is_rental: Yup.number().required(),
  address: Yup.string().min(2).required(),
  zip_code: Yup.number().min(0).required(),
  region: Yup.object({
    id: Yup.number().required(),
    name: Yup.string().required(),
  }).required(),
  city: Yup.object({
    id: Yup.number().required(),
    name: Yup.string().required(),
    region_id: Yup.number().required(),
  }).required(),
  price: Yup.number().min(0).required(),
  area: Yup.number().min(0).required(),
  bedrooms: Yup.number().min(0).required(),
  description: Yup.string()
    .test('minWords', value => {
      if (!value) return true
      return value.split(' ').filter(Boolean).length >= 5
    })
    .required(),
  image: Yup.string().required(),
  agent: Yup.object({
    surname: Yup.string().required(),
    name: Yup.string().required(),
    avatar: Yup.string().required(),
    id: Yup.number().required(),
  }).required(),
})

const CreateListing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { agents, fetchAgents } = useFetchAgents()
  const { regions, fetchRegions } = useFetchRegions()
  const { cities, fetchCities } = useFetchCities()

  useEffect(() => {
    fetchAgents()
  }, [fetchAgents])

  useEffect(() => {
    fetchRegions()
  }, [fetchRegions])

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const navigate = useNavigate()

  const initialValues = useMemo(() => {
    const savedValues = localStorage.getItem('formValues')
    return savedValues
      ? JSON.parse(savedValues)
      : {
          is_rental: 0,
          address: '',
          zip_code: '',
          region: {
            id: 0,
            name: '',
          },
          city: {
            id: 0,
            name: '',
            region_id: 0,
          },
          price: '',
          area: '',
          bedrooms: '',
          description: '',
          image: '',
          agent: {
            surname: '',
            name: '',
            avatar: '',
            id: 0,
          },
        }
  }, [])

  const initialTouched = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const touched: any = {}
    Object.keys(initialValues).forEach(key => {
      if (
        typeof initialValues[key] === 'object' &&
        initialValues[key] !== null
      ) {
        // Handle nested objects
        Object.keys(initialValues[key]).forEach(nestedKey => {
          touched[`${key}.${nestedKey}`] = Boolean(
            initialValues[key][nestedKey],
          )
        })
      } else {
        touched[key] = Boolean(initialValues[key])
      }
    })
    return touched
  }, [initialValues])

  const formik = useFormik({
    initialValues,
    validationSchema,
    initialTouched,
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = createFormData(values)

        const response = await fetch(
          `https://api.real-estate-manager.redberryinternship.ge/api/real-estates`,
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
            handleClearForm()
            navigate('/')
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

  const filteredCities = useMemo(
    () => cities.filter(city => city.region_id == formik.values.region.id),
    [cities, formik.values.region.id],
  )

  const handleClearForm = () => {
    formik.resetForm()
    localStorage.removeItem('formValues')
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('formValues', JSON.stringify(formik.values))
    }, 1000)

    // Cleanup function
    return () => {
      clearTimeout(handler)
    }
  }, [formik.values])

  return (
    <HeaderLayout>
      <div className="m-auto my-16 flex max-w-3xl flex-col gap-16">
        <h1 className="text-center text-4xl font-medium text-[#021526]">
          ლისტინგის დამატება
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          id="listing"
          className="flex flex-col gap-20"
        >
          {/* DEAL TYPE */}
          <div className="flex flex-col gap-4">
            <h2 className="font-Helvetica font-medium leading-5 text-[#1A1A1F]">
              გარიგების ტიპი
            </h2>
            <div className="flex gap-9">
              <RadioButton
                label="იყიდება"
                name="is_rental"
                value={0}
                checked={formik.values.is_rental === 0}
                onChange={() => formik.setFieldValue('is_rental', 0)}
              />

              <RadioButton
                label="ქირავდება"
                name="is_rental"
                value={1}
                checked={formik.values.is_rental === 1}
                onChange={() => formik.setFieldValue('is_rental', 1)}
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex flex-col gap-4">
            <h2 className="font-Helvetica font-medium leading-5 text-[#1A1A1F]">
              მდებარეობა
            </h2>
            <div className="grid grid-cols-2 gap-4">
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
              <Select
                id={'region'}
                label={'რეგიონი'}
                formik={formik}
                options={regions}
                customHandleOptionSelect={() =>
                  formik.setFieldValue('city', '')
                }
              />
              {formik.values.region.name && (
                <Select
                  id={'city'}
                  label={'ქალაქი'}
                  formik={formik}
                  options={filteredCities}
                />
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-4">
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
            <Textarea
              id={'description'}
              label={'აღწერა *'}
              formik={formik}
              errorText={'მინიმუმ ხუთი სიტყვა'}
            />
            <FileInput id={'image'} label={'ატვირთეთ ფოტო *'} formik={formik} />
          </div>

          {/* AGENT */}
          <div className="flex flex-col gap-4">
            <h2 className="font-Helvetica font-medium leading-5 text-[#1A1A1F]">
              აგენტი
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Select
                id={'agent'}
                label={'აირჩიე'}
                formik={formik}
                options={agents}
                openModal={openModal}
              />
            </div>
          </div>

          {/* SUBMIT AND CANCEL BUTTONS */}
          <div className="flex justify-end gap-4">
            <Button
              form={'listing'}
              type={'button'}
              onClick={() => {
                handleClearForm()
                navigate('/')
              }}
              backgroundColor={'#FFF'}
              textColor={'#F93B1D'}
              text={'გაუქმება'}
            />
            <Button
              form={'listing'}
              type={'submit'}
              backgroundColor={'#F93B1D'}
              textColor={'#FFF'}
              text={formik.isSubmitting ? 'დაელოდეთ...' : ' დაამატე ლისტინგი'}
            />
          </div>
        </form>
      </div>
      {isModalOpen && <CreateAgentModal closeModal={closeModal} />}
    </HeaderLayout>
  )
}

export default CreateListing
