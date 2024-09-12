export interface CardProps {
  id: number
  address: string
  zip_code: string
  price: number
  area: number
  bedrooms: number
  is_rental: number
  image: string
  city_id: number
  city: {
    id: number
    name: string
    region_id: number
    region: {
      id: number
      name: string
    }
  }
}
