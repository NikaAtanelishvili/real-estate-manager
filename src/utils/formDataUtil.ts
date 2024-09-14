import { CreateListing } from '@/types'

const base64ToFile = (base64String: string, fileName: string): File => {
  const [prefix, base64Data] = base64String.split(',')

  if (!prefix || !base64Data) {
    throw new Error('Invalid base64 string format.')
  }

  const byteString = atob(base64Data)
  const byteNumbers = new Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)

  const mimeTypeMatch = prefix.match(/:(.*?);/)
  if (!mimeTypeMatch) {
    throw new Error('Unable to determine MIME type.')
  }
  const mimeType = mimeTypeMatch[1]

  const blob = new Blob([byteArray], { type: mimeType })

  return new File([blob], fileName, { type: mimeType })
}

export const createListingFormData = (values: CreateListing) => {
  const formData = new FormData()

  formData.append('is_rental', values.is_rental.toString())
  formData.append('address', values.address)
  formData.append('zip_code', values.zip_code)
  formData.append('price', values.price)
  formData.append('area', values.area)
  formData.append('bedrooms', values.bedrooms)
  formData.append('description', values.description)
  formData.append('region_id', values.region.id.toString())
  formData.append('city_id', values.city.id.toString())
  formData.append('agent_id', values.agent.id.toString())

  const file = base64ToFile('image', values.image)

  formData.append('image', file)

  return formData
}
