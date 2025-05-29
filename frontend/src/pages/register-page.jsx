import { Link } from "react-router-dom"
import SignUpForm from "../components/signup-form"

function RegisterPage() {
  return (
    <div className="w-full h-[100vh] flex ">
        <div className="w-full md:w-[50%] flex flex-col justify-between p-[30px] md:p-[50px]">
            <Link to={'/'}>
                <img className="w-[200px]" src="/image.png" alt="logo" />
            </Link>
            <div>
                <SignUpForm/>
            </div>
            <div className="flex justify-between">
                <p>{`Already have an account?`} <Link to="/" className="text-[#116dfd] underline">Sign In</Link></p>
            </div>
        </div>
        <div className="w-[50%] bg-[#555] hidden md:flex h-[100vh] overflow-hidden">
            <img src="/auth-bg.png" className="object-cover w-full h-full" alt="auth background" />
        </div>
    </div>
  )
}

export default RegisterPage