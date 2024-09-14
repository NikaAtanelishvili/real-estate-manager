import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { CreateListing, Listing, ListingDetails } from '@/pages'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Listing />} />,
    <Route path="/create-listing" element={<CreateListing />} />,
    <Route path="/:id" element={<ListingDetails />} />,
  ]),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
