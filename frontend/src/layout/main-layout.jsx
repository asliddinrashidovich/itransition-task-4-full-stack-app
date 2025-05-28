import { Outlet } from "react-router-dom"
import {Toaster} from 'react-hot-toast'

function MainLayout() {
  return (
    <>
        <div>
          <Toaster position={'top-right'}></Toaster>
        </div>
        <Outlet/>
    </>
  )
}

export default MainLayout