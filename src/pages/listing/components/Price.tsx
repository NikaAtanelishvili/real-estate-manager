import { CloseSvg, OpenSvg } from '@/assets'
import { FormikValues, useFormik } from 'formik'
import * as Yup from 'yup'

interface PriceType {
  isOpen: boolean
  toggleDropdown: () => void
}

const priceShortcuts = [50, 100, 150, 200, 250, 300]

const Price: React.FC<PriceType> = ({ isOpen, toggleDropdown }) => {
  const formik = useFormik({
    initialValues: {
      minPrice: '',
      maxPrice: '',
    },
    validationSchema: Yup.object({
      minPrice: Yup.number()
        .positive('ჩაწერეთ ვალიდური მონაცემები')
        .max(Yup.ref('maxPrice'), 'ჩაწერეთ ვალიდური მონაცემები'),
      maxPrice: Yup.number()
        .positive('ჩაწერეთ ვალიდური მონაცემები')
        .min(Yup.ref('minPrice'), 'ჩაწერეთ ვალიდური მონაცემები'),
    }),
    onSubmit: values => {
      // WORK IN PROGRESS (HANDLING FILTER)
      console.log('მინიმალური ფასი:', values.minPrice)
      console.log('მაქსიმალური ფასი', values.maxPrice)
      toggleDropdown() // Close the dropdown after applying
    },
  })

  const handleShortcutClick = (
    value: number,
    field: 'minPrice' | 'maxPrice',
  ) => {
    formik.setFieldValue(field, value)
  }
  return (
    <div>
      <button
        type="button"
        className={`flex min-w-max items-center gap-1 rounded-md px-4 py-2 ${
          isOpen ? 'bg-[#F3F3F3]' : 'bg-transparent'
        }`}
        onClick={toggleDropdown}
      >
        <span className="font-medium text-[#021526]">საფასო კატეგორია</span>
        {isOpen ? <CloseSvg /> : <OpenSvg />}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-4 flex w-auto min-w-max flex-col gap-6 rounded-xl border border-[#DBDBDB] bg-white p-6 shadow-[5px_5px_12px_0px_#02152614]">
          <p className="w-full font-medium leading-5 text-[#021526]">
            ფასის მიხედვით
          </p>

          <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-3">
                <PriceInput id={'minPrice'} formik={formik} />

                <PriceInput id={'maxPrice'} formik={formik} />
              </div>
              {formik.values.minPrice &&
              formik.values.maxPrice &&
              (formik.errors.minPrice || formik.errors.maxPrice) ? (
                <p className="text-xs leading-3 text-[#F93B1D]">
                  ჩაწერეთ ვალიდური მონაცემები
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* MIN PRICE */}
              <div className="flex flex-col gap-4">
                <p className="text-sm font-medium leading-4 text-[#021526]">
                  მინ. ფასი
                </p>
                <div className="flex flex-col gap-2">
                  {priceShortcuts.map(value => (
                    <p
                      key={value}
                      className="cursor-pointer text-sm leading-4 text-[#2D3648]"
                      onClick={() =>
                        handleShortcutClick(value * 1000, 'minPrice')
                      }
                    >
                      {`${value},000 ₾`}
                    </p>
                  ))}
                </div>
              </div>

              {/* MAX PRICE */}
              <div className="flex flex-col gap-4">
                <p className="text-sm font-medium leading-4 text-[#021526]">
                  მაქს. ფასი
                </p>
                <div className="flex flex-col gap-2">
                  {priceShortcuts.map(value => (
                    <p
                      key={value}
                      className="cursor-pointer text-sm leading-4 text-[#2D3648]"
                      onClick={() =>
                        handleShortcutClick(value * 1000, 'maxPrice')
                      }
                    >
                      {`${value},000 ₾`}
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

/////////////////////////////////////////////////////////////////

interface PriceInputProps {
  id: string
  formik: FormikValues
}

const PriceInput: React.FC<PriceInputProps> = props => {
  return (
    <div className="relative flex items-center">
      <input
        className={`max-w-40 rounded-md border border-[#808A93] p-3 text-sm leading-4 text-[#021526] outline-none ${
          props.formik.values.minPrice &&
          props.formik.values.maxPrice &&
          (props.formik.errors.minPrice || props.formik.errors.maxPrice)
            ? 'border-[#F93B1D]'
            : ''
        }`}
        type="number"
        name={props.id}
        placeholder="დან"
        id={props.id}
        {...props.formik.getFieldProps(props.id)}
      />
      <span className="absolute right-3 text-sm leading-3 text-[#2D3648]">
        ₾
      </span>
    </div>
  )
}

export default Price
