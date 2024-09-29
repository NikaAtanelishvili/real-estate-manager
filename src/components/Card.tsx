import { AreaSvg, BedSvg, LocationSvg, ZipCodeSvg } from '@/assets'
import { CardProps } from '@/types'
import { useNavigate } from 'react-router-dom'

const Card: React.FC<CardProps> = props => {
  const navigate = useNavigate()

  return (
    <div
      className="flex cursor-pointer flex-col rounded-2xl shadow-none transition-shadow duration-300 ease-in-out hover:shadow-[5px_5px_12px_0px_#02152614]"
      onClick={() => navigate(`/${props.id}`)}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '384 / 307' }}
      >
        <img
          className="h-full w-full rounded-t-2xl object-cover"
          src={props.image}
          alt="real estate's interior"
        />
        <div className="absolute left-6 top-6 flex items-center justify-center rounded-2xl bg-[#02152680] p-2">
          <p className="text-xs font-medium text-white">
            {props.is_rental ? 'ქირავდება' : 'იყიდება'}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 rounded-b-2xl border border-t-0 border-[#DBDBDB] p-6">
        {/* price */}
        <p className="text-3xl font-bold leading-8 text-[#021526]">
          {Number(props.price)
            .toLocaleString('en-US', { useGrouping: true })
            .replace(/,/g, ' ')}{' '}
          ₾
        </p>

        {/* address */}
        <div className="flex items-center gap-1">
          <LocationSvg />
          <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap leading-5 text-[#021526B2]">
            {props.city.name} {props.address}
          </p>
        </div>

        {/* info */}
        <div className="flex items-center gap-8">
          <div className="inline-flex items-center gap-1">
            <BedSvg />
            <p className="leading-5 text-[#021526B2]">{props.bedrooms}</p>
          </div>

          <div className="inline-flex items-center gap-1">
            <AreaSvg />
            <p className="leading-5 text-[#021526B2]">{props.area}</p>
          </div>

          <div className="inline-flex items-center gap-1">
            <ZipCodeSvg />
            <p className="leading-5 text-[#021526B2]">{props.zip_code}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
