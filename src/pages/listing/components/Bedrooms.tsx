import { CloseSvg, OpenSvg } from '@/assets'
import { Input } from '@/components'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'

interface BedroomsType {
  isOpen: boolean
  toggleDropdown: () => void
  onSelectionChange: (bedrooms: number | null) => void
  selectedBedrooms: number | null
}

const Bedrooms: React.FC<BedroomsType> = ({
  isOpen,
  toggleDropdown,
  onSelectionChange,
  selectedBedrooms,
}) => {
  // Sync local selectedBedrooms state with the parent-selectedBedrooms state (THIS IS HELL)
  useEffect(() => {
    formik.setFieldValue('bedrooms', selectedBedrooms)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBedrooms])

  const formik = useFormik({
    initialValues: {
      bedrooms: null,
    } as {
<<<<<<< HEAD
      bedrooms: number | null | string
    },
    // =========TYPING AND THEN DELETING IN INPUT SOMEHOW TURN VALUE INTO EMPTY STRING===========
    validate: values => {
      if (values.bedrooms === '') {
        values.bedrooms = null
      }
    },
=======
      bedrooms: number | null
    },
>>>>>>> b2e29af0846ba49255ecff4f9a2a272671b680c0
    validationSchema: Yup.object({
      bedrooms: Yup.number()
        .typeError('Must be a number')
        .integer('Must be an integer')
        .min(1, 'Minimum of 1 bedroom')
        .nullable(),
    }),
    onSubmit: values => {
<<<<<<< HEAD
      onSelectionChange(values.bedrooms as number)
      toggleDropdown() // Close the dropdown after applying
    },
  })

  console.log(formik.values)
=======
      onSelectionChange(Number(values.bedrooms))
      toggleDropdown() // Close the dropdown after applying
    },
  })
>>>>>>> b2e29af0846ba49255ecff4f9a2a272671b680c0

  return (
    <div>
      <button
        type="button"
        className={`flex min-w-max items-center gap-1 rounded-md px-4 py-2 ${
          isOpen ? 'bg-[#F3F3F3]' : 'bg-transparent'
        }`}
        onClick={toggleDropdown}
      >
        <span className="font-medium text-[#021526]">
          საძინებლების რაოდენობა
        </span>
        {isOpen ? <CloseSvg /> : <OpenSvg />}
      </button>
      {isOpen && (
        <>
          {/* TRANSPARENT BACKGROUND! WHEN USER CLICKS OUTSIDE OF DROPDOWN IT CLOSES */}
          <div
            className="fixed inset-0 z-0 bg-transparent"
            onClick={toggleDropdown}
          ></div>

          <div className="absolute z-10 mt-4 flex w-auto min-w-max flex-col gap-6 rounded-xl border border-[#DBDBDB] bg-white p-6 shadow-[5px_5px_12px_0px_#02152614]">
            <p className="w-full font-medium leading-5 text-[#021526]">
              საძინებლების რაოდენობა
            </p>
            <form id="bedrooms" onSubmit={formik.handleSubmit}>
              <div className="flex w-full flex-col items-center justify-end gap-8">
                <div className="w-full">
                  <div className="w-11">
                    <Input id={'bedrooms'} formik={formik} type={'number'} />
                  </div>
                </div>
                <div className="flex w-full justify-end">
                  <button
                    id="price"
                    type="submit"
                    className="rounded-lg bg-[#F93B1D] px-4 py-2 text-sm font-medium leading-4 text-white hover:bg-[#DF3014]"
                  >
                    არჩევა
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default Bedrooms
