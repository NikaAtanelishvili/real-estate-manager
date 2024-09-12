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
import { useFetchListingDetails } from '@/hooks'
import { HeaderLayout } from '@/layouts'
import { ListingDetailsType } from '@/types'
import { useNavigate, useParams } from 'react-router-dom'
import dummyListing from '../listing/dummyListing'
import { ListingsCarousel } from './components'

const DUMMY_LISTING_DETAILS: ListingDetailsType = {
  id: 1,
  address: 'შარტავას 2ა',
  zip_code: '0101',
  price: 100000,
  image:
    'https://scontent.ftbs5-3.fna.fbcdn.net/v/t1.15752-9/327064586_497680645655588_3362001961629637268_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGD9rlxU2MmHYR-TWgVNWrCtwPTHjf2mqq3A9MeN_aaqsB0eRgmaUxuaXXaKAJFnUkl8hGxro9UKWWUFpO8cViO&_nc_ohc=BCFyMvGtlGkQ7kNvgFR2y5B&_nc_ht=scontent.ftbs5-3.fna&_nc_gid=A2hNT6OuxRSGEOoKD6Rs_AG&oh=03_Q7cD1QFfpbBNTIuIlFiNox6OsFun3aQOGjwcQTJW1uOWMI1VMg&oe=670A07D6',
  area: 100.5,
  bedrooms: 3,
  is_rental: 0,
  city_id: 1,
  description: 'სახლი ლიანდაგთან',
  created_at: '2024-08-07T10:46:53.000000Z',
  city: {
    id: 1,
    name: 'სოხუმი',
    region_id: 1,
    region: {
      id: 1,
      name: 'აფხაზეთი',
    },
  },
  agent_id: 1,
  agent: {
    id: 1,
    name: 'gela',
    surname: 'gocha',
    email: 'gela@redberry.ge',
    phone: '555555555',
    avatar:
      'https://scontent.ftbs5-4.fna.fbcdn.net/v/t1.15752-9/321740597_6521159607899875_371374777232995509_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEWgsMCFnY07-sXWGwATmogNI8KmZnxtdU0jwqZmfG11dysb6UswaHCHFyfj6v0E8kdlot2ANvMV2x-nCfWFMKf&_nc_ohc=J3rKM2gJfocQ7kNvgEC8OB6&_nc_ht=scontent.ftbs5-4.fna&oh=03_Q7cD1QGdAv7OM-JlNX55urikaHIy0VBqhxmoZFZXchz2kCyxtA&oe=670A74D0',
  },
}

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Get the listing id from the URL

  // WORK IN PROGRESS
  const listingDetails = useFetchListingDetails(id!)

  const navigate = useNavigate()

  // DATE FORMAT
  const date = new Date(DUMMY_LISTING_DETAILS.created_at)

  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Months are zero-based
  const day = ('0' + date.getDate()).slice(-2)
  const year = date.getFullYear()

  const formattedDate = `${month}/${day}/${year}`

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
                  src={DUMMY_LISTING_DETAILS.image}
                />
                <div className="absolute left-10 top-10 flex items-center justify-center rounded-2xl bg-[#02152680] p-2">
                  <p className="text-xl font-medium leading-6 text-white">
                    {DUMMY_LISTING_DETAILS.is_rental ? 'ქირავდება' : 'იყიდება'}
                  </p>
                </div>
              </div>
              <p className="p-3 text-right leading-5 text-[#808A93]">
                {'გამოქვეყნების თარიღი '}
                {formattedDate}
              </p>
            </div>

            <div className="flex flex-col gap-6 px-16 pt-7">
              <h1 className="text-5xl font-bold leading-[60px] text-[#021526]">
                {DUMMY_LISTING_DETAILS.price}
                {' ₾'}
              </h1>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex aspect-square w-[22px] items-center justify-center">
                    <LocationSvg />
                  </div>
                  <p className="text-2xl text-[#808A93]">
                    {DUMMY_LISTING_DETAILS.city.name}
                  </p>
                  <p className="text-2xl text-[#808A93]">
                    {DUMMY_LISTING_DETAILS.address}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1">
                  <div className="flex aspect-square w-[22px] items-center justify-center">
                    <AreaSvg />
                  </div>
                  <p className="text-2xl text-[#808A93]">
                    {'ფართი '}
                    {DUMMY_LISTING_DETAILS.area}
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
                    {DUMMY_LISTING_DETAILS.bedrooms}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1">
                  <div className="flex aspect-square w-[22px] items-center justify-center">
                    <ZipCodeSvg />
                  </div>
                  <p className="text-2xl text-[#808A93]">
                    {'საფოსტო ინდექსი '}
                    {DUMMY_LISTING_DETAILS.zip_code}
                  </p>
                </div>
              </div>

              <p className="leading-7 text-[#808A93]">
                {DUMMY_LISTING_DETAILS.description}
              </p>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 rounded-lg border border-[#DBDBDB] p-5">
                  <div className="flex items-center gap-4">
                    <img
                      className="aspect-square w-20 rounded-full object-cover"
                      src={DUMMY_LISTING_DETAILS.agent.avatar}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="leading-5 text-[#021526]">
                        {DUMMY_LISTING_DETAILS.agent.name}{' '}
                        {DUMMY_LISTING_DETAILS.agent.surname}
                      </p>
                      <p className="text-sm leading-4 text-[#676E76]">აგენტი</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <MailSvg />
                      <p className="text-sm leading-4 text-[#808A93]">
                        {DUMMY_LISTING_DETAILS.agent.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <PhoneSvg />
                      <p className="text-sm leading-4 text-[#808A93]">
                        {DUMMY_LISTING_DETAILS.agent.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="rounded-lg border border-[#676E76] p-3 text-xs font-medium text-[#676E76]"
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
            {dummyListing.map(listing => (
              <div className="w-96 px-4">
                <Card key={listing.id} {...listing} />
              </div>
            ))}
          </ListingsCarousel>
        </section>
      </div>
    </HeaderLayout>
  )
}

export default ListingDetails
