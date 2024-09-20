import {
  AreaSvg,
  BackSvg,
  BedSvg,
  LocationSvg,
  MailSvg,
  PhoneSvg,
  ZipCodeSvg,
} from '@/assets'
import { Card } from '@/components'
import { HeaderLayout } from '@/layouts'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DeleteListingModal, ListingsCarousel } from './components'
import { useEffect, useState } from 'react'
import { useFetchListingDetails, useFetchListings } from '@/hooks'
import { CardProps } from '@/types'

const ListingDetails: React.FC = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // State for the delete listing modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { listings, fetchListings } = useFetchListings()
  const { listingDetails, error } = useFetchListingDetails(id!)

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  // Handlers for opening and closing the modal
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = ('0' + (date.getMonth() + 1)).slice(-2) // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2)
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Early return if there's an error
  if (error) {
    return (
      <>
        <h1 className="text-xl leading-6 text-[#021526CC]">
          ლისტინგი არ მოიძებნა
        </h1>
        <Link className="text-sm underline" to={'/'}>
          მთავარ გვერდძე დაბრუნდება
        </Link>
      </>
    )
  }

  // Early return while data is loading
  if (!listingDetails || !listings) {
    return (
      <HeaderLayout>
        <div className="my-16 flex flex-col gap-14">
          <section className="mx-40">
            {/* back button */}
            <div className="mb-7 cursor-pointer">
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            </div>

            {/* details */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="flex flex-col">
                <div
                  className="relative animate-pulse overflow-hidden rounded-2xl bg-gray-200"
                  style={{ aspectRatio: '839 / 670' }}
                ></div>
                <p className="animate-pulse p-3 text-right text-gray-200">
                  {'გამოქვეყნების თარიღი '}
                  <span className="inline-block h-4 w-24 rounded-full bg-gray-200" />
                </p>
              </div>

              <div className="flex flex-col gap-6 px-16 pt-7">
                <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200"></div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-[22px] w-[22px] animate-pulse rounded-full bg-gray-200"></div>
                    <p className="h-6 w-24 animate-pulse rounded-lg bg-gray-200"></p>
                    <p className="h-6 w-40 animate-pulse rounded-lg bg-gray-200"></p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <div className="h-[22px] w-[22px] animate-pulse rounded-full bg-gray-200"></div>
                    <p className="h-6 w-24 animate-pulse rounded-lg bg-gray-200"></p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <div className="h-[22px] w-[22px] animate-pulse rounded-full bg-gray-200"></div>
                    <p className="h-6 w-24 animate-pulse rounded-lg bg-gray-200"></p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <div className="h-[22px] w-[22px] animate-pulse rounded-full bg-gray-200"></div>
                    <p className="h-6 w-40 animate-pulse rounded-lg bg-gray-200"></p>
                  </div>
                </div>

                <p className="h-12 animate-pulse rounded-lg bg-gray-200 leading-7 text-gray-200"></p>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4 rounded-lg border border-[#DBDBDB] p-5">
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200"></div>
                      <div className="flex flex-col gap-1">
                        <p className="h-6 w-32 animate-pulse rounded-lg bg-gray-200"></p>
                        <p className="h-4 w-20 animate-pulse rounded-lg bg-gray-200"></p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-40 animate-pulse rounded-lg bg-gray-200"></div>
                      <div className="h-4 w-40 animate-pulse rounded-lg bg-gray-200"></div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* carousel */}
          <section>
            <div className="flex justify-center gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-96 px-4">
                  <div className="h-40 w-full animate-pulse rounded-lg bg-gray-200"></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="h-full w-full animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        )}
      </HeaderLayout>
    )
  }

  // Filter related listings based on region ID
  const relatedListings = listings.filter(
    (listing: CardProps) =>
      listing.city.region_id === listingDetails.city.region_id &&
      listing.id !== listingDetails.id,
  )

  const handleDeleteListing = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 9d05d85b-41d1-4d0d-9779-85c35560821f`,
          },
        },
      )
      switch (response.status) {
        case 200: {
          closeModal()
          navigate('/')
          break
        }

        case 401: {
          const error = await response.json()
          throw new Error(error.message || 'Please provide valid API token')
        }

        case 404: {
          const error = await response.json()
          throw new Error(error.message || 'Real estate not found')
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
      setLoading(false)
    }
  }

  return (
    <HeaderLayout>
      <div className="my-16 flex flex-col gap-14">
        <section className="mx-40">
          {/* back button */}
          <div className="mb-7 cursor-pointer" onClick={() => navigate('/')}>
            <BackSvg />
          </div>

          {/* details */}
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="flex flex-col">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '839 / 670' }}
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={listingDetails.image}
                  alt="real estate's interior"
                />
                <div className="absolute left-10 top-10 flex items-center justify-center rounded-2xl bg-[#02152680] p-2">
                  <p className="text-xl font-medium leading-6 text-white">
                    {listingDetails.is_rental ? 'ქირავდება' : 'იყიდება'}
                  </p>
                </div>
              </div>
              <p className="p-3 text-right leading-5 text-[#808A93]">
                {'გამოქვეყნების თარიღი '}
                {formatDate(listingDetails.created_at)}
              </p>
            </div>

            <div className="flex flex-col gap-6 px-16 pt-7">
              <h1 className="text-5xl font-bold leading-[60px] text-[#021526]">
                {Number(listingDetails.price)
                  .toLocaleString('en-US', { useGrouping: true })
                  .replace(/,/g, ' ')}{' '}
                ₾
              </h1>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex aspect-square w-[22px] items-center justify-center">
                    <LocationSvg />
                  </div>
                  <p className="text-2xl text-[#808A93]">
                    {listingDetails.city.name}
                  </p>
                  <p className="text-2xl text-[#808A93]">
                    {listingDetails.address}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1">
                  <div className="flex aspect-square w-[22px] items-center justify-center">
                    <AreaSvg />
                  </div>
                  <p className="text-2xl text-[#808A93]">
                    {'ფართი '}
                    {listingDetails.area}
                    {' მ'}
                    <sup>2</sup>
                  </p>
                </div>

                <div className="inline-flex items-center gap-1">
                  <div className="flex aspect-square w-[22px] items-center justify-center">
                    <BedSvg />
                  </div>
                  <p className="text-2xl text-[#808A93]">
                    {'საძინებელი '}
                    {listingDetails.bedrooms}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1">
                  <div className="flex aspect-square w-[22px] items-center justify-center">
                    <ZipCodeSvg />
                  </div>
                  <p className="text-2xl text-[#808A93]">
                    {'საფოსტო ინდექსი '}
                    {listingDetails.zip_code}
                  </p>
                </div>
              </div>

              <p className="leading-7 text-[#808A93]">
                {listingDetails.description}
              </p>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 rounded-lg border border-[#DBDBDB] p-5">
                  <div className="flex items-center gap-4">
                    <img
                      className="aspect-square w-20 rounded-full object-cover"
                      src={listingDetails.agent.avatar}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="leading-5 text-[#021526]">
                        {listingDetails.agent.name}{' '}
                        {listingDetails.agent.surname}
                      </p>
                      <p className="text-sm leading-4 text-[#676E76]">აგენტი</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <MailSvg />
                      <p className="text-sm leading-4 text-[#808A93]">
                        {listingDetails.agent.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <PhoneSvg />
                      <p className="text-sm leading-4 text-[#808A93]">
                        {listingDetails.agent.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <button
                    onClick={openModal}
                    type="button"
                    className="rounded-lg border border-[#808A93] p-3 text-xs font-medium text-[#808A93] hover:bg-[#808A93] hover:text-white"
                    style={{
                      transition: 'background-color 0.2s ease-in-out',
                    }}
                  >
                    ლისთინგის წაშლა
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* carousel */}
        <section>
          <ListingsCarousel>
            {relatedListings.map((listing: CardProps) => (
              <div className="w-96 px-4" key={listing.id}>
                <Card {...listing} />
              </div>
            ))}
          </ListingsCarousel>
        </section>
      </div>
      {isModalOpen && (
        <DeleteListingModal
          closeModal={closeModal}
          deleteListing={handleDeleteListing}
          loading={loading}
        />
      )}
    </HeaderLayout>
  )
}

export default ListingDetails
