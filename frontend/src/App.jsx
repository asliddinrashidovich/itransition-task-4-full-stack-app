import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/main-layout"
import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import RegisterPage from "./pages/register-page"
import NotFoundPage from "./pages/not-found-page"
import PropTypes from "prop-types"

App.propTypes  = {
  children: PropTypes.node.isRequired
}

function App() {
  const isAuth = () => localStorage.getItem('token')
  function ProtectedRoute({children}) {
    if(isAuth()) {
      return children
    } else {
      return <NotFoundPage/>
    }
  }
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<LoginPage/>}/>
        <Route path="signup" element={<RegisterPage/>}/>
        <Route path="dashboard" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Route>
    )
  )
  return (
    <>
     <RouterProvider router={routes}/> 
    </>
  )
}

export default App