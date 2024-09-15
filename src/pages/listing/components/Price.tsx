import { CloseSvg, OpenSvg } from '@/assets'
import { RangeInput } from '@/components'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'

interface PriceType {
  isOpen: boolean
  toggleDropdown: () => void
  onSelectionChange: (min: number, max: number) => void
  selectedPrice: { min: number; max: number }
}

const priceShortcuts = [50, 100, 150, 200, 250, 300]

const Price: React.FC<PriceType> = ({
  isOpen,
  toggleDropdown,
  onSelectionChange,
  selectedPrice,
}) => {
  const formik = useFormik({
    initialValues: {
      minPrice: -Infinity,
      maxPrice: Infinity,
    } as {
      minPrice: number | string
      maxPrice: number | string
    },
    // =========TYPING AND THEN DELETING IN INPUT SOMEHOW TURN VALUE INTO EMPTY STRING===========
    validate: values => {
      if (values.minPrice === '') {
        values.minPrice = -Infinity
      }
      if (values.maxPrice === '') {
        values.maxPrice = Infinity
      }
    },
    validationSchema: Yup.object({
      minPrice: Yup.number().max(
        Yup.ref('maxPrice'),
        'ჩაწერეთ ვალიდური მონაცემები',
      ),
      maxPrice: Yup.number().min(
        Yup.ref('minPrice'),
        'ჩაწერეთ ვალიდური მონაცემები',
      ),
    }),
    onSubmit: values => {
      onSelectionChange(Number(values.minPrice), Number(values.maxPrice))
      toggleDropdown() // Close the dropdown after applying
    },
  })

  const handleShortcutClick = (
    value: number,
    field: 'minPrice' | 'maxPrice',
  ) => {
    formik.setFieldValue(field, value)
  }

  // Sync local Formik values with parent-selected values (minPrice, maxPrice)
  useEffect(() => {
    formik.setFieldValue('minPrice', selectedPrice.min || -Infinity)
    formik.setFieldValue('maxPrice', selectedPrice.max || Infinity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrice])

  const error =
    formik.values.minPrice &&
    formik.values.maxPrice &&
    formik.errors.minPrice &&
    formik.errors.maxPrice
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
        <span className="font-medium text-[#021526]">საფასო კატეგორია</span>
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
              ფასის მიხედვით
            </p>

            <form
              id="price"
              className="flex flex-col gap-6"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-3">
                  <RangeInput
                    id={'minPrice'}
                    formik={formik}
                    error={error}
                    rangeType={'price'}
                  />
                  <RangeInput
                    id={'maxPrice'}
                    formik={formik}
                    error={error}
                    rangeType={'price'}
                  />
                </div>
                {error ? (
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
                  id="price"
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

export default Price
