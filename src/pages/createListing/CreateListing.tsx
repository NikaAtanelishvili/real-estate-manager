import { Input } from '@/components'
import { HeaderLayout } from '@/layouts'
import { AgentType, CityType, RegionType } from '@/types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, FileInput, RadioButton, Select, Textarea } from './components'
import { dummy_agents, dummy_cities, dummy_regions } from './dummyData'
import { useMemo } from 'react'

interface CreateListing {
  is_rental: number
  address: string
  zip_code: number
  region: RegionType
  city: CityType
  price: number
  area: number
  bedrooms: number
  description: string
  image: string
  agent: AgentType
}

const CreateListing: React.FC = () => {
  const validationSchema = Yup.object({
    is_rental: Yup.number().required(),
    address: Yup.string().min(2).required(),
    zip_code: Yup.number().required(),
    region: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required(),
    }).required(),
    city: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required(),
      region_id: Yup.number().required(),
    }).required(),
    price: Yup.number().required(),
    area: Yup.number().required(),
    bedrooms: Yup.number().required(),
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

  const formik = useFormik({
    initialValues: {
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
    },

    validationSchema,
    onSubmit: values => {
      console.log(values)
    },
  })

  const filtered_dummy_cities = useMemo(
    () =>
      dummy_cities.filter(city => city.region_id == formik.values.region.id),
    [formik.values.region.id],
  )

  return (
    <HeaderLayout>
      <div className="m-auto my-16 flex max-w-3xl flex-col gap-16">
        <h1 className="text-center text-4xl font-medium text-[#021526]">
          ლისტინგის დამატება
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          id="createListing"
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
                options={dummy_regions}
              />
              {formik.values.region.name && (
                <Select
                  id={'city'}
                  label={'ქალაქი'}
                  formik={formik}
                  options={filtered_dummy_cities}
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
                options={dummy_agents}
              />
            </div>
          </div>

          {/* SUBMIT AND CANCEL BUTTONS */}
          <div className="flex justify-end gap-4">
            <Button
              type={'button'}
              onClick={() => {
                formik.resetForm()
              }}
              backgroundColor={'#FFF'}
              textColor={'#F93B1D'}
              text={'გაუქმება'}
            />
            <Button
              type={'submit'}
              backgroundColor={'#F93B1D'}
              textColor={'#FFF'}
              text={' დაამატე ლისტინგი'}
            />
          </div>
        </form>
      </div>
    </HeaderLayout>
  )
}

export default CreateListing
