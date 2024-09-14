import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRef } from 'react'
import { BackSvg, NextSvg } from '@/assets'
import React from 'react'

const ListingsCarousel: React.FC<{ children: React.ReactNode }> = props => {
  const sliderRef = useRef<Slider | null>(null)

  const itemsCount = React.Children.count(props.children)

  const settings = {
    dots: false,
    infinite: itemsCount >= 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: itemsCount >= 4,
    nextArrow: (
      <div onClick={() => sliderRef.current?.slickNext()}>
        <NextSvg />
      </div>
    ),
    prevArrow: (
      <div onClick={() => sliderRef.current?.slickPrev()}>
        <BackSvg />
      </div>
    ),
  }

  return (
    <section>
      <div className="flex w-full flex-col gap-12">
        <h2 className="mx-40 text-3xl font-medium text-[#021526]">
          ბინები მსგავს ლოკაციებზე
        </h2>
        {itemsCount === 0 ? (
          <h4 className="mx-40 text-xl leading-6 text-[#021526CC]">
            არ მოიძებნა
          </h4>
        ) : (
          <Slider className="mx-36" ref={sliderRef} {...settings}>
            {props.children}
            {itemsCount < 4 &&
              [...Array(4 - itemsCount)].map((_, index) => (
                <div key={`empty-${index}`}></div>
              ))}
          </Slider>
        )}
      </div>
    </section>
  )
}

export default ListingsCarousel
