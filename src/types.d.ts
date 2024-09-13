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

export interface ListingDetailsType extends CardProps {
  created_at: string
  agent_id: number
  description: string
  agent: {
    id: number
    name: string
    surname: string
    email: string
    phone: string
    avatar: string
  }
}

export interface AgentType {
  id: number
  name: string
  surname: string
  avatar: string
}

export interface CityType {
  id: number
  name: string
  region_id: number
}

export interface RegionType {
  id: number
  name: string
}
