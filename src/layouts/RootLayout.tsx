import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null // This component doesn't render anything
}

// THIS LAYOUT IS ONLY NEEDED FOR SWITCHING PAGES WITH RELATED LISTINGS CAROUSEL
const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet /> {/* Renders the matched child route e.g. "/..."*/}
  </>
)

export default RootLayout
