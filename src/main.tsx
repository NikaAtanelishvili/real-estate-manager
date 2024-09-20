import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { CreateListing, Listing, ListingDetails } from '@/pages'
import { RootLayout } from './layouts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Listing />} />
      <Route path="create-listing" element={<CreateListing />} />
      <Route path=":id" element={<ListingDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
