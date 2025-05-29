import { Link } from "react-router-dom"
import LoginForm from "../components/login-form"
import toast from "react-hot-toast"

function LoginPage() {
    function handleClick() {
        toast("Forgot password? Contact to the admin: asliddinrashidovich7@gmail.com", {icon: '🆘'})
    }
  return (
    <div className="w-full h-[100vh] flex ">
        <div className="w-full md:w-[50%] flex flex-col justify-between p-[30px] md:p-[50px]">
            <Link to={'/'}>
                <img className="w-[200px]" src="/image.png" alt="logo" />
            </Link>
            <div>
                <LoginForm/>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-start">
                <p>{`Don't have an account?`} <Link to="/signup" className="text-[#116dfd] underline">Sign Up</Link></p>
                <button  onClick={handleClick} className="text-[#116dfd] underline cursor-pointer">Forgot Password?</button>
            </div>
        </div>
        <div className="w-[50%] bg-[#555] hidden md:flex h-[100vh] overflow-hidden">
            <img src="/auth-bg.png" className="object-cover w-full h-full" alt="auth background" />
        </div>
    </div>
  )
}

export default LoginPage