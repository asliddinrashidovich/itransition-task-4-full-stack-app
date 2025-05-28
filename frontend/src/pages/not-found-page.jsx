import { useNavigate } from "react-router-dom"

function NotFoundPage() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  function handleClick() {
    if(token) navigate('/dashboard')
    else navigate('/')
  }
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-[300px] font-[300] leading-[120%]">404</h1>
        <p className="text-[35px] mb-[10px] font-[600]">Page Not Found ☹️</p>
        <p className="text-[20px] text-[#555] mb-[20px]">{`We can't find the page you were looking for.`}</p>
        <button onClick={handleClick} className="bg-[blue] rounded-[10px] text-[#fff] cursor-pointer py-[10px] px-[30px]">Go to {token ? 'dashboard page' : 'login page'}</button>
      </div>
    </div>
  )
}

export default NotFoundPage