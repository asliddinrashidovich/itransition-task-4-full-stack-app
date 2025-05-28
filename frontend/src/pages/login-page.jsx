import { Link } from "react-router-dom"
import LoginForm from "../components/login-form"

function LoginPage() {
  return (
    <div className="w-full h-[100vh] flex ">
        <div className="w-full md:w-[50%] flex flex-col justify-between p-[50px]">
            <Link to={'/'}>
                <img className="w-[200px]" src="/image.png" alt="logo" />
            </Link>
            <div>
                <LoginForm/>
            </div>
            <div className="flex justify-between">
                <p>{`Don't have an account?`} <Link to="/signup" className="text-[#116dfd] underline">Sign Up</Link></p>
                <Link to="/signup" className="text-[#116dfd] underline">Forgot Password?</Link>
            </div>
        </div>
        <div className="w-[50%] bg-[#555] hidden md:flex h-[100vh] overflow-hidden">
            <img src="/auth-bg.png" className="object-cover w-full h-full" alt="auth background" />
        </div>
    </div>
  )
}

export default LoginPage