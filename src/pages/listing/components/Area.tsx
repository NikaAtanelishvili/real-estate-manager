import { CloseSvg, OpenSvg } from '@/assets'
import { RangeInput } from '@/components'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface AreaType {
  isOpen: boolean
  toggleDropdown: () => void
}

const areaShortcuts = [10, 20, 30, 40, 50]

const Area: React.FC<AreaType> = ({ isOpen, toggleDropdown }) => {
  const formik = useFormik({
    initialValues: {
      minArea: '',
      maxArea: '',
    },
    validationSchema: Yup.object({
      minArea: Yup.number()
        .positive('ჩაწერეთ ვალიდური მონაცემები')
        .max(Yup.ref('maxArea'), 'ჩაწერეთ ვალიდური მონაცემები'),
      maxArea: Yup.number()
        .positive('ჩაწერეთ ვალიდური მონაცემები')
        .min(Yup.ref('minArea'), 'ჩაწერეთ ვალიდური მონაცემები'),
    }),
    onSubmit: values => {
      // WORK IN PROGRESS (HANDLING FILTER)
      console.log('მინიმალური ფართობი:', values.minArea)
      console.log('მაქსიმალური ფართობიი', values.maxArea)
      toggleDropdown() // Close the dropdown after applying
    },
  })

  const handleShortcutClick = (value: number, field: 'minArea' | 'maxArea') => {
    formik.setFieldValue(field, value)
  }

  const error =
    formik.values.minArea &&
    formik.values.maxArea &&
    (formik.errors.minArea || formik.errors.maxArea)
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
        <div className="absolute z-10 mt-4 flex w-auto min-w-max flex-col gap-6 rounded-xl border border-[#DBDBDB] bg-white p-6 shadow-[5px_5px_12px_0px_#02152614]">
          <p className="w-full font-medium leading-5 text-[#021526]">
            ფართობის მიხედვით
          </p>

          <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
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
                      onClick={() =>
                        handleShortcutClick(value * 1000, 'minArea')
                      }
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
                      onClick={() =>
                        handleShortcutClick(value * 1000, 'maxArea')
                      }
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
                type="submit"
                className="rounded-lg bg-[#F93B1D] px-4 py-2 text-sm font-medium leading-4 text-white"
              >
                არჩევა
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Area
