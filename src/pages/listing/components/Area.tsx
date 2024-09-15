import { CloseSvg, OpenSvg } from '@/assets'
import { RangeInput } from '@/components'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'

interface AreaType {
  isOpen: boolean
  toggleDropdown: () => void
  onSelectionChange: (min: number, max: number) => void
  selectedArea: { min: number; max: number }
}

const areaShortcuts = [50, 60, 70, 80, 90]

const Area: React.FC<AreaType> = ({
  isOpen,
  toggleDropdown,
  onSelectionChange,
  selectedArea,
}) => {
  const formik = useFormik({
    initialValues: {
      minArea: -Infinity,
      maxArea: Infinity,
    } as {
      minArea: number | string
      maxArea: number | string
    },
    // =========TYPING AND THEN DELETING IN INPUT SOMEHOW TURN VALUE INTO EMPTY STRING===========
    validate: values => {
      if (values.minArea === '') {
        values.minArea = -Infinity
      }
      if (values.maxArea === '') {
        values.maxArea = Infinity
      }
    },
    validationSchema: Yup.object({
      minArea: Yup.number().max(
        Yup.ref('maxArea'),
        'ჩაწერეთ ვალიდური მონაცემები',
      ),
      maxArea: Yup.number().min(
        Yup.ref('minArea'),
        'ჩაწერეთ ვალიდური მონაცემები',
      ),
    }),
    onSubmit: values => {
      onSelectionChange(Number(values.minArea), Number(values.maxArea))
      toggleDropdown() // Close the dropdown after applying
    },
  })

  const handleShortcutClick = (value: number, field: 'minArea' | 'maxArea') => {
    formik.setFieldValue(field, value)
  }

  // Sync local Formik values with parent-selected values (minArea, maxArea)
  useEffect(() => {
    formik.setFieldValue('minArea', selectedArea.min || -Infinity)
    formik.setFieldValue('maxArea', selectedArea.max || Infinity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArea])

  const error =
    formik.values.minArea &&
    formik.values.maxArea &&
    formik.errors.minArea &&
    formik.errors.maxArea
      ? true
      : false

  return (
    <div>
      <button
        type="button"
        className={`flex min-w-max items-center gap-1 rounded-md px-4 py-2 ${
          isOpen ? 'bg-[#F3F3F3]' : 'bg-transparent'
        }`}
        onClick={toggleDropdown}
      >
        <span className="font-medium text-[#021526]">ფართობი</span>
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
              ფართობის მიხედვით
            </p>

            <form
              id="area"
              className="flex flex-col gap-6"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-3">
                  <RangeInput
                    id={'minArea'}
                    formik={formik}
                    error={error}
                    rangeType={'area'}
                  />
                  <RangeInput
                    id={'maxArea'}
                    formik={formik}
                    error={error}
                    rangeType={'area'}
                  />
                </div>
                {error ? (
                  <p className="text-xs leading-3 text-[#F93B1D]">
                    ჩაწერეთ ვალიდური მონაცემები
                  </p>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* MIN AREA */}
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-medium leading-4 text-[#021526]">
                    მინ. მ<sup>2</sup>
                  </p>
                  <div className="flex flex-col gap-2">
                    {areaShortcuts.map(value => (
                      <p
                        key={value}
                        className="cursor-pointer text-sm leading-4 text-[#2D3648]"
                        onClick={() => handleShortcutClick(value, 'minArea')}
                      >
                        {`${value},000 მ`}
                        <sup>2</sup>
                      </p>
                    ))}
                  </div>
                </div>

                {/* MAX AREA */}
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-medium leading-4 text-[#021526]">
                    მაქს. მ<sup>2</sup>
                  </p>
                  <div className="flex flex-col gap-2">
                    {areaShortcuts.map(value => (
                      <p
                        key={value}
                        className="cursor-pointer text-sm leading-4 text-[#2D3648]"
                        onClick={() => handleShortcutClick(value, 'maxArea')}
                      >
                        {`${value},000 მ`}
                        <sup>2</sup>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center justify-end">
                <button
                  form="area"
                  type="submit"
                  className="rounded-lg bg-[#F93B1D] px-4 py-2 text-sm font-medium leading-4 text-white hover:bg-[#DF3014]"
                >
                  არჩევა
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default Area
